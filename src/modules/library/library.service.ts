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
        is_available: createPhysicalBookDto.is_available,
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
        if (!foundReference.is_available) {
          throw new BadRequestException('No se puede prestar el libro indicado');
        }
        return await foundReference
          .$query(trx)
          .update({ is_available: false })
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
        if(foundReference.is_available) {
          throw new BadRequestException('El libro se encuentra en biblioteca, no se puede devolver');
        }

        await foundReference
          .$query(trx)
          .update({ is_available: true })
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
        if (!foundReference.is_available) {
          throw new BadRequestException('No se puede prestar el libro indicado');
        }
        await foundReference.$query(trx).update({is_available: false});
        const createdReceipt = await this.libraryReceiptModel
          .query(trx)
          .insert({
            ra: createExternalLoanDto.ra,
            personal_id: createExternalLoanDto.personal_id,
            place: createExternalLoanDto.place,
            library_reference_id: foundReference.id,
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
        
        const foundReceipt = await this.libraryReceiptModel
        .query(trx)
        .where('id', createExternalReturnDto.loan_id)
        .where('returned_at', null)
        .first();
        
        if (!foundReceipt) {
          throw new NotFoundException('No se encontro un recibo del prestamo valido');
        }
        
        if ( foundReference.is_available ) {
          throw new BadRequestException('No se puede devolver el libro indicado');
        }
        await foundReference.$query(trx).update({ is_available: true });

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

  async findOnePublic(id: number, trx?: Transaction) {
    const bookModel = await this.bookModel.query(trx).findById(id);
    if (bookModel.media_id) {
      return await bookModel.$query(trx).withGraphFetched('media');
    } else {
      const references = await bookModel.$query(trx);

      const countResult = await this.libraryReferenceModel
        .query(trx)
        .where('book_id', id)
        .andWhere('is_available', true)
        .count('id');

      return {
        ...references,
        totalAvailable: Number((countResult[0] as any).count),
      };
    }
  }

  async getOutstandingExternalLoansById(book_reference_id: string) {
    return await this.libraryReceiptModel
      .query()
      .where('library_reference_id', book_reference_id)
      .where('returned_at', null);
  }

  async getOutstandingExternalLoans() {
    return await this.libraryReceiptModel
      .query()
      .withGraphFetched('library_reference.book')
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
    if (queryDto.category_id) {
      builder.andWhere(
        'category_id',
        queryDto.category_id,
      );
    }

    return builder;
  }
}
