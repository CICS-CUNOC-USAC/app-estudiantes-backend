import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ModelClass } from 'objection';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { CreateExternalLoanDto } from './dto/create-external-loan.dto';
import { CreateExternalReturnDto } from './dto/create-external-return.dto';
import { LibraryReceiptModel } from './entities/library_receipt.model';
import { LibraryReferenceModel } from './entities/library_reference.model';

@Injectable()
export class LoansService {
  private readonly logger = new Logger(LoansService.name);

  constructor(
    @Inject(LibraryReferenceModel.name)
    private readonly libraryReferenceModel: ModelClass<LibraryReferenceModel>,
    @Inject(LibraryReceiptModel.name)
    private readonly libraryReceiptModel: ModelClass<LibraryReceiptModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {}

  async createSimpleLoan(book_reference_id: string) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const foundReference = await this.libraryReferenceModel
        .query(trx)
        .whereNull('deleted_at')
        .findById(book_reference_id);
      if (foundReference) {
        if (!foundReference.is_available) {
          throw new BadRequestException(
            'No se puede prestar el libro indicado',
          );
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
        .whereNull('deleted_at')
        .findById(book_reference_id);
      if (foundReference) {
        if (foundReference.is_available) {
          throw new BadRequestException(
            'El libro se encuentra en biblioteca, no se puede devolver',
          );
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
        .whereNull('deleted_at')
        .findById(book_reference_id);
      if (foundReference) {
        if (!foundReference.is_available) {
          throw new BadRequestException(
            'No se puede prestar el libro indicado',
          );
        }
        await foundReference.$query(trx).update({ is_available: false });
        return await this.libraryReceiptModel.query(trx).insert({
          ra: createExternalLoanDto.ra,
          personal_id: createExternalLoanDto.personal_id,
          place: createExternalLoanDto.place,
          library_reference_id: foundReference.id,
        });
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
        .whereNull('deleted_at')
        .findById(book_reference_id);
      if (!foundReference) {
        throw new NotFoundException('Libro no encontrado');
      }

      const foundReceipt = await this.libraryReceiptModel
        .query(trx)
        .whereNull('deleted_at')
        .where('id', createExternalReturnDto.loan_id)
        .where('returned_at', null)
        .first();

      if (!foundReceipt) {
        throw new NotFoundException(
          'No se encontro un recibo del prestamo valido',
        );
      }

      if (foundReference.is_available) {
        throw new BadRequestException(
          'No se puede devolver el libro indicado',
        );
      }

      await foundReference.$query(trx).update({ is_available: true });

      return await foundReceipt
        .$query(trx)
        .patch({ returned_at: new Date() })
        .returning('*');
    }, this.logger);
  }

  async getOutstandingExternalLoansById(book_reference_id: string) {
    return await this.libraryReceiptModel
      .query()
      .whereNull('deleted_at')
      .where('library_reference_id', book_reference_id)
      .where('returned_at', null);
  }

  async getOutstandingExternalLoans() {
    return await this.libraryReceiptModel
      .query()
      .whereNull('deleted_at')
      .withGraphFetched('library_reference.book')
      .where('returned_at', null);
  }

  async getReturnedOutstandingExternalLoans() {
    return await this.libraryReceiptModel
      .query()
      .whereNull('deleted_at')
      .withGraphFetched('library_reference.book')
      .whereNotNull('returned_at');
  }
}
