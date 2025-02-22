import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { LibraryReceiptModel } from './entities/library_receipt.model';
import { CreateExternalLoanDto } from './dto/create-external-loan.dto';
import { CreateExternalReturnDto } from './dto/create-external-return.dto';
import { BookCategoryModel } from './entities/book_category.model';

export enum BookType {
  DIGITAL,
  PHYSICAL,
}

@Injectable()
export class LibraryService extends BaseService {
  constructor(
    @Inject(BookModel.name)
    private readonly bookModel: ModelClass<BookModel>,
    @Inject(BookCategoryModel.name)
    private readonly bookCategoryModel: ModelClass<BookCategoryModel>,
    @Inject(LibraryReferenceModel.name)
    private readonly libraryReferenceModel: ModelClass<LibraryReferenceModel>,
    @Inject(LibraryReceiptModel.name)
    private readonly libraryReceiptModel: ModelClass<LibraryReceiptModel>,
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
      return await this.findOne(createdBook.$id(), trx);
    }, this.logger);
  }

  async createPhysical(createPhysicalBookDto: CreatePhysicalBookDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const createdBook = await this.bookModel.query(trx).insert({
        name: createPhysicalBookDto.name,
        isbn: createPhysicalBookDto.isbn,
        description: createPhysicalBookDto.description,
        author: createPhysicalBookDto.author,
        category_id: createPhysicalBookDto.category_id,
      });

      await this.libraryReferenceModel.query(trx).insert({
        id: createPhysicalBookDto.reference_id,
        book_id: createdBook.$id(),
        total_availability: createPhysicalBookDto.total_availability,
        current_availability: createPhysicalBookDto.current_availability,
        edition: createPhysicalBookDto.edition,
        location: createPhysicalBookDto.location,
      });

      return await this.findOne(createdBook.$id(), trx);
    }, this.logger);
  }

  async createSimpleLoan(book_reference_id: string) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundReference = await this.libraryReferenceModel
        .query(trx)
        .findById(book_reference_id);
      if (foundReference) {
        if (foundReference.current_availability - 1 < 0) {
          throw new BadRequestException('No se pueden prestar más libros');
        }
        return await foundReference
          .$query(trx)
          .decrement('current_availability', 1)
          .returning('*');
      } else {
        throw new NotFoundException('Libro no encontrado');
      }
    }, this.logger);
  }

  async createSimpleReturn(book_reference_id: string) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundReference = await this.libraryReferenceModel
        .query(trx)
        .findById(book_reference_id);
      if (foundReference) {
        if (
          foundReference.current_availability + 1 >
          foundReference.total_availability
        ) {
          throw new BadRequestException('No se pueden devolver más libros');
        }

        if (
          foundReference.current_availability + 1 >
          foundReference.total_availability -
            (await this.getOutstangingExternalLoansById(book_reference_id))
              .length
        ) {
          throw new BadRequestException('No se pueden devolver más libros');
        }

        await foundReference
          .$query(trx)
          .increment('current_availability', 1)
          .returning('*');
        return foundReference;
      } else {
        throw new NotFoundException('Libro no encontrado');
      }
    }, this.logger);
  }

  async createExternalLoan(
    book_reference_id: string,
    createExternalLoanDto: CreateExternalLoanDto,
  ) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundReference = await this.libraryReferenceModel
        .query(trx)
        .findById(book_reference_id);
      if (foundReference) {
        if (foundReference.current_availability - 1 < 0) {
          throw new BadRequestException('No se pueden prestar más libros');
        }
        await foundReference.$query(trx).decrement('current_availability', 1);

        console.log(`${createExternalLoanDto}, ${book_reference_id}`);
        const createdReceipt = await this.libraryReceiptModel
          .query(trx)
          .insert({
            ra: createExternalLoanDto.ra,
            personal_id: createExternalLoanDto.personal_id,
            place: createExternalLoanDto.place,
            library_reference_id: book_reference_id,
          });

        return createdReceipt;
      } else {
        throw new NotFoundException('Libro no encontrado');
      }
    }, this.logger);
  }

  async createExternalReturn(
    book_reference_id: string,
    createExternalReturnDto: CreateExternalReturnDto,
  ) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundReference = await this.libraryReferenceModel
        .query(trx)
        .findById(book_reference_id);
      if (foundReference) {
        if (
          foundReference.current_availability + 1 >
          foundReference.total_availability
        ) {
          throw new BadRequestException('No se pueden devolver más libros');
        }
        await foundReference.$query(trx).increment('current_availability', 1);

        const foundReceipt = await this.libraryReceiptModel
          .query(trx)
          .where('ra', createExternalReturnDto.ra)
          .where('personal_id', createExternalReturnDto.personal_id)
          .where('library_reference_id', book_reference_id)
          .where('returned_at', null)
          .first();

        if (!foundReceipt) {
          throw new NotFoundException('No se encontro un recibo del prestamo');
        }

        return await foundReceipt
          .$query(trx)
          .patch({ returned_at: new Date() })
          .returning('*');
      } else {
        throw new Error('Libro no encontrado');
      }
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

  async findAll(queryDto: BooksQueryDto, type: 'digital' | 'physical') {
    const paginationOptions = this.createPaginationOptions(queryDto);
    let resultsQueryBuilder: any = [];
    if (type === 'digital') {
      resultsQueryBuilder = this.bookModel
        .query()
        .select('*')
        .whereNotNull('media_id')
        .where((builder) => this.queryFilters(queryDto, builder))
        .orderBy(paginationOptions.orderBy);
    } else {
      resultsQueryBuilder = this.bookModel
        .query()
        .select('*')
        .withGraphFetched('library_reference')
        .whereNull('media_id')
        .where((builder) => this.queryFilters(queryDto, builder))
        .orderBy(paginationOptions.orderBy);
    }
    return this.getCompletePaginatedResponse(
      await this.getPaginatedResults(resultsQueryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: number, trx?: Transaction) {
    const bookModel = await this.bookModel.query(trx).findById(id);
    if (bookModel.media_id) {
      return await bookModel.$query(trx).withGraphFetched('media');
    } else {
      return await bookModel.$query(trx).withGraphFetched('library_reference');
    }
  }

  async getOutstangingExternalLoansById(book_reference_id: string) {
    return await this.libraryReceiptModel
      .query()
      .where('library_reference_id', book_reference_id)
      .where('returned_at', null);
  }

  async findAllCategories() {
    return await this.bookCategoryModel.query();
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
