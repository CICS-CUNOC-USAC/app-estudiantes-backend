import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { BookCategoryModel } from './entities/book_category.model';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { CreateReferenceDto } from './dto/create-reference.dto';

@Injectable()
export class BooksService extends BaseService {
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
    super(BooksService.name);
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

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const book = await this.bookModel.query(trx).findOne('id', id);
      if (book) {
        await book.$query(trx).patch(updateLibraryDto);
      }
      return book;
    }, this.logger);
  }

  async updateReference(
    bookId: number,
    referenceId: string,
    updateReferenceDto: UpdateReferenceDto,
  ) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const reference = await this.libraryReferenceModel
        .query(trx)
        .whereNull('deleted_at')
        .findOne({ book_id: bookId, id: referenceId });
      if (reference) {
        await reference.$query(trx).patch(updateReferenceDto);
      }
      return reference;
    }, this.logger);
  }

  async createReference(
    bookId: number,
    referenceId: string,
    createReferenceDto: CreateReferenceDto,
  ) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const existingReference = await this.libraryReferenceModel
        .query(trx)
        .findById(referenceId);

      // The reference may share id with a previously deleted reference.
      // If so, patch and re-enable it to avoid duplicate key errors.
      if (existingReference) {
        if (!existingReference.deleted_at) {
          throw new BadRequestException(
            'La referencia para el libro ya existe',
          );
        }
        return await existingReference
          .$query(trx)
          .patch({
            book_id: bookId,
            edition: createReferenceDto.edition,
            location: createReferenceDto.location,
            deleted_at: null,
          })
          .returning('*');
      }

      const createdReference = await this.libraryReferenceModel
        .query(trx)
        .insert({
          book_id: bookId,
          id: referenceId,
          edition: createReferenceDto.edition,
          location: createReferenceDto.location,
        });
      return this.libraryReferenceModel
        .query(trx)
        .findOne(createdReference.$id);
    }, this.logger);
  }

  async deleteReference(bookId: number, referenceId: string) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const reference = await this.libraryReferenceModel
        .query(trx)
        .whereNull('deleted_at')
        .findOne({ book_id: bookId, id: referenceId });

      if (!reference) {
        throw new NotFoundException('Referencia no encontrada');
      }

      await this.libraryReceiptModel
        .query(trx)
        .where('library_reference_id', referenceId)
        .patch({ deleted_at: new Date() });

      await this.libraryReferenceModel
        .query(trx)
        .where('id', referenceId)
        .patch({ deleted_at: new Date() });

      return {
        message: `Referencia ${referenceId} eliminada correctamente`,
        reference,
      };
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
        .whereNull('deleted_at')
        .andWhere('is_available', true)
        .count('id');

      return {
        ...references,
        totalAvailable: Number((countResult[0] as any).count),
      };
    }
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
      builder.andWhere('category_id', queryDto.category_id);
    }

    return builder;
  }
}
