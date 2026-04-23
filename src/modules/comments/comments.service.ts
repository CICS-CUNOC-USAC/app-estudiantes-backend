import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { BaseService } from 'src/core/utils/base-service';
import { SanitizationService } from 'src/core/sanitization/sanitization.service';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentModel } from './entities/comment.model';

@Injectable()
export class CommentsService extends BaseService {
  constructor(
    @Inject(CommentModel.name)
    private readonly commentModel: ModelClass<CommentModel>,
    private readonly dbTrxService: DatabaseTransactionService,
    private readonly sanitizationService: SanitizationService,
  ) {
    super(CommentsService.name);
  }

  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    return builder;
  }

  async create(userId: number, dto: CreateCommentDto) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const sanitizedPostId = this.sanitizationService.sanitizeStrapiPostId(
        dto.strapiPostId,
      );
      const sanitizedContent = await this.sanitizationService.sanitizeComment(
        dto.content,
      );

      const duplicatedComment = await this.commentModel
        .query(trx)
        .findOne({
          user_id: userId,
          strapi_post_id: sanitizedPostId,
          content: sanitizedContent,
        })
        .where('created_at', '>=', new Date(Date.now() - 60_000));

      if (duplicatedComment) {
        throw new BadRequestException(
          'Ya enviaste este comentario recientemente',
        );
      }

      if (dto.parentId) {
        const parentComment = await this.commentModel
          .query(trx)
          .findById(dto.parentId);

        if (!parentComment) {
          throw new NotFoundException('Comentario padre no encontrado');
        }

        if (parentComment.parent_id !== null) {
          throw new BadRequestException(
            'Solo se permite un nivel de respuestas',
          );
        }

        if (parentComment.strapi_post_id !== sanitizedPostId) {
          throw new BadRequestException(
            'El comentario padre no pertenece al post indicado',
          );
        }
      }

      const createdComment = await this.commentModel.query(trx).insert({
        content: sanitizedContent,
        strapi_post_id: sanitizedPostId,
        user_id: userId,
        parent_id: dto.parentId ?? null,
      });

      const withUser = await this.commentModel
        .query(trx)
        .findById(createdComment.id)
        .withGraphFetched('user.profile');

      return this.serializeComment(withUser);
    }, this.logger);
  }

  async findByPost(strapiPostId: string) {
    const sanitizedPostId = this.sanitizationService.sanitizeStrapiPostId(
      strapiPostId,
    );

    const comments = await this.commentModel
      .query()
      .where('strapi_post_id', sanitizedPostId)
      .whereNull('parent_id')
      .withGraphFetched('[user.profile, replies.[user.profile]]')
      .modifyGraph('replies', (builder) => {
        builder.orderBy('created_at', 'asc');
      })
      .orderBy('created_at', 'desc');

    return comments.map((comment) => {
      const serializedComment = this.serializeComment(comment);
      return {
        ...serializedComment,
        replies: comment.replies.map((reply) => this.serializeComment(reply)),
      };
    });
  }

  async delete(commentId: number, userId: number) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundComment = await this.commentModel.query(trx).findById(commentId);

      if (!foundComment) {
        throw new NotFoundException('Comentario no encontrado');
      }

      if (foundComment.user_id !== userId) {
        throw new ForbiddenException('No tienes permiso para borrar este comentario');
      }

      if (foundComment.parent_id === null) {
        await this.commentModel.query(trx).delete().where('parent_id', commentId);
      }

      await this.commentModel.query(trx).deleteById(commentId);

      return {
        message: 'Comentario eliminado correctamente',
      };
    }, this.logger);
  }

  private serializeComment(comment: CommentModel) {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.created_at,
      user: {
        id: comment.user?.id,
        name: this.resolveUserName(comment.user),
      },
    };
  }

  private resolveUserName(user: any) {
    if (!user) {
      return null;
    }

    if (user.username) {
      return user.username;
    }

    if (user.profile?.first_name || user.profile?.last_name) {
      return `${user.profile?.first_name || ''} ${user.profile?.last_name || ''}`.trim();
    }

    return null;
  }
}
