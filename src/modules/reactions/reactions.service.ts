import { Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { BaseService } from 'src/core/utils/base-service';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { ToggleReactionDto } from './dto/toggle-reaction.dto';
import { ReactionModel, ReactionType } from './entities/reaction.model';

@Injectable()
export class ReactionsService extends BaseService {
  constructor(
    @Inject(ReactionModel.name)
    private readonly reactionModel: ModelClass<ReactionModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(ReactionsService.name);
  }

  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    return builder;
  }

  async toggle(userId: number, dto: ToggleReactionDto) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const existingReaction = await this.reactionModel.query(trx).findOne({
        strapi_post_id: dto.strapiPostId,
        user_id: userId,
      });

      if (existingReaction) {
        if (existingReaction.type === dto.type) {
          await this.reactionModel.query(trx).deleteById(existingReaction.id);
          return { reaction: null };
        }

        const updatedReaction = await this.reactionModel
          .query(trx)
          .patchAndFetchById(existingReaction.id, {
            type: dto.type,
          });

        return {
          reaction: this.serializeReaction(updatedReaction),
        };
      }

      const createdReaction = await this.reactionModel.query(trx).insert({
        type: dto.type,
        strapi_post_id: dto.strapiPostId,
        user_id: userId,
      });

      return {
        reaction: this.serializeReaction(createdReaction),
      };
    }, this.logger);
  }

  async getByPost(strapiPostId: string, userId?: number) {
    const reactions = await this.reactionModel
      .query()
      .where('strapi_post_id', strapiPostId);

    const counts: Record<ReactionType, number> = {
      [ReactionType.LIKE]: 0,
      [ReactionType.LOVE]: 0,
      [ReactionType.HAHA]: 0,
      [ReactionType.SAD]: 0,
      [ReactionType.ANGRY]: 0,
    };

    for (const reaction of reactions) {
      counts[reaction.type] = (counts[reaction.type] || 0) + 1;
    }

    const userReaction = userId
      ? reactions.find((reaction) => reaction.user_id === userId)?.type || null
      : null;

    return {
      counts,
      userReaction,
      total: reactions.length,
    };
  }

  private serializeReaction(reaction: ReactionModel) {
    return {
      id: reaction.id,
      type: reaction.type,
      strapiPostId: reaction.strapi_post_id,
      userId: reaction.user_id,
      createdAt: reaction.created_at,
    };
  }
}
