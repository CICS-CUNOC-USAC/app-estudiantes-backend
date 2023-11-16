import { Inject, Injectable } from '@nestjs/common';
import { BooksQueryDto } from './dto/books-query.dto';
import { BookModel } from './entities/library.model';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { BaseService } from 'src/core/utils/base-service';

@Injectable()
export class LibraryService extends BaseService {
  constructor(
    @Inject(BookModel.name)
    private readonly bookModel: ModelClass<BookModel>,
  ) {
    super(LibraryService.name);
  }

  async findAll(queryDto: BooksQueryDto) {
    const paginationOptions = this.createPaginationOptions(queryDto);
    const resultsQueryBuilder = this.bookModel
      .query()
      .select('*')
      .where((builder) => this.queryFilters(queryDto, builder))
      .orderBy(paginationOptions.orderBy);
    return this.getCompletePaginatedResponse(
      await this.getPaginatedResults(resultsQueryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: number, trx?: Transaction) {
    const book = await this.bookModel
      .query(trx)
      .findOne('id', id)
      .withGraphFetched('media');
    return book;
  }

  queryFilters(
    queryDto: BooksQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (queryDto.name) {
      builder.andWhere(
        'name',
        'ilike',
        `%${this.normalizeString(queryDto.name)}%`,
      );
    }
    if (queryDto.author) {
      builder.andWhere(
        'author',
        'ilike',
        `%${this.normalizeString(queryDto.author)}%`,
      );
    }

    return builder;
  }
}
