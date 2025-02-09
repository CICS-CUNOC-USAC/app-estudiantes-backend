import { Inject, Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { BooksQueryDto } from './dto/books-query.dto';
import { BookModel } from './entities/library.model';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { BaseService } from 'src/core/utils/base-service';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { MediaService } from '../media/media.service';

@Injectable()
export class LibraryService extends BaseService {
  constructor(
    @Inject(BookModel.name)
    private readonly bookModel: ModelClass<BookModel>,
    private readonly mediaService: MediaService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(LibraryService.name);
  }

  async create(createLibraryDto: CreateLibraryDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const createdBook = await this.bookModel
        .query(trx)
        .insert(createLibraryDto);
      return await this.findOne(createdBook.$id(), trx);
    }, this.logger);
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const book = await this.bookModel.query(trx).findOne('id', id);
      if (book) {
        await book.$query(trx).patch(updateLibraryDto);
      }
      return book;
    }, this.logger);
  }

  async remove(id: number) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const book = await this.bookModel.query(trx).findOne('id', id);
      await this.bookModel.query(trx).deleteById(id);
      await this.mediaService.deleteKeyFileByMediaId(book.media_id, trx, true);
      return {
        message: `Book with id ${id} and attached media ${book.media_id} deleted`,
        book,
      };
    }, this.logger);
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
