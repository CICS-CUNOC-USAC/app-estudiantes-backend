import { Inject, Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { BooksQueryDto } from './dto/books-query.dto';
import { BookModel } from './entities/book.model';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { BaseService } from 'src/core/utils/base-service';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { MediaService } from '../media/media.service';
import { CreateDigitalBookDto } from './dto/create-digital-book.dto';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { LibraryReferenceModel } from './entities/library_reference.model';

export enum BookType {
  DIGITAL,
  PHYSICAL,
}

@Injectable()
export class LibraryService extends BaseService {
  constructor(
    @Inject(BookModel.name)
    private readonly bookModel: ModelClass<BookModel>,
    @Inject(LibraryReferenceModel.name)
    private readonly libraryReferenceModel: ModelClass<LibraryReferenceModel>,
    private readonly mediaService: MediaService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(LibraryService.name);
  }

  async createDigital(createDigitalBookDto: CreateDigitalBookDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const createdBook = await this.bookModel
        .query(trx)
        .insert(createDigitalBookDto);
      return await this.findOne(createdBook.$id(), BookType.DIGITAL, trx);
    }, this.logger);
  }

  async createPhysical(createPhysicalBookDto: CreatePhysicalBookDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const createdBook = await this.bookModel.query(trx).insert({
        name: createPhysicalBookDto.name,
        isbn: createPhysicalBookDto.isbn,
        description: createPhysicalBookDto.description,
        author: createPhysicalBookDto.author,
      });

      await this.libraryReferenceModel.query(trx).insert({
        id: createPhysicalBookDto.reference_id,
        book_id: createdBook.$id(),
        total_availability: createPhysicalBookDto.total_availability,
        current_availability: createPhysicalBookDto.current_availability,
        edition: createPhysicalBookDto.edition,
        location: createPhysicalBookDto.location,
      });

      return await this.findOne(createdBook.$id(), BookType.PHYSICAL, trx);
    }, this.logger);
  }

  async createSimpleLoan(book_reference_id: string) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundReference = await this.libraryReferenceModel
        .query(trx)
        .findById(book_reference_id);
      if (foundReference) {
        if (
          foundReference.current_availability + 1 >
          foundReference.total_availability
        ) {
          throw new Error('No se pueden prestar más libros');
        }
        await foundReference.$query(trx).increment('current_availability', 1);
      }
      return foundReference;
    }, this.logger);
  }

  async createSimpleReturn(book_reference_id: string) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundReference = await this.libraryReferenceModel
        .query(trx)
        .findById(book_reference_id);
      if (foundReference) {
        if (foundReference.current_availability - 1 < 0) {
          throw new Error('No se pueden devolver más libros');
        }
        await foundReference.$query(trx).decrement('current_availability', 1);
      }
      return foundReference;
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

  async findOne(id: number, bookType: BookType, trx?: Transaction) {
    const bookModel = this.bookModel.query(trx).findById(id);
    if (bookType === BookType.DIGITAL) {
      bookModel.withGraphFetched('media');
    } else if (bookType === BookType.PHYSICAL) {
      bookModel.withGraphFetched('library_reference');
    }
    return await bookModel;
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
