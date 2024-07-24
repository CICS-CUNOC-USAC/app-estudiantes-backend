import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { StaffModel } from '../staffs/entities/staff.model';
import { MediaService } from '../media/media.service';
import { BaseService } from 'src/core/utils/base-service';
import { QueryBuilder, Model } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';


@Injectable()
export class ArticlesService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly mediaService: MediaService,

    private readonly dbTrxService: DatabaseTransactionService
  ) {
    super(ArticlesService.name);
  }

  async create(
    file: Express.Multer.File,
    createArticleDto: CreateArticleDto,
    staffUser: StaffModel
  ) {
    // Deconstruct the DTO
    const { media: createMediaDto, ...articleDto } = createArticleDto;

    const createdMedia = await this.mediaService.create(file, createMediaDto);
    return await this.dbTrxService.databaseTransaction(async (trx) => { });
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
