import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LibraryService } from './library.service';
import { PermissionsGuard } from 'src/core/guards/permissions/permissions.guard';
import { CheckAbilities } from 'src/core/decorators/abilities/abilities.decorator';
import { CreateExternalLoanDto } from './dto/create-external-loan.dto';
import { CreateExternalReturnDto } from './dto/create-external-return.dto';
import { LibraryReceiptModel } from './entities/library_receipt.model';

@ApiTags('Library/Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly libraryService: LibraryService) {}

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Loan' })
  @Get('outstanding-loans')
  @ApiResponse({
    status: 200,
    description: 'List of outstanding loans',
    type: LibraryReceiptModel,
    isArray: true,
  })
  getOutstandingExternalLoans() {
    return this.libraryService.getOutstandingExternalLoans();
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Loan' })
  @Get('outstanding-loans/returned')
  @ApiResponse({
    status: 200,
    description: 'List of returned outstanding loans',
    type: LibraryReceiptModel,
    isArray: true,
  })
  getReturnedOutstandingExternalLoans() {
    return this.libraryService.getReturnedOutstandingExternalLoans();
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Loan' })
  @Post('simple-loan/:book_reference_id')
  createSimpleLoan(@Param('book_reference_id') book_id: string) {
    return this.libraryService.createSimpleLoan(book_id);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Loan' })
  @Post('simple-return/:book_reference_id')
  createSimpleReturn(@Param('book_reference_id') book_id: string) {
    return this.libraryService.createSimpleReturn(book_id);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Loan' })
  @Post('external-loan/:book_reference_id')
  createExternalLoan(
    @Param('book_reference_id') book_reference_id: string,
    @Body(new ValidationPipe())
    createExternalLoanDto: CreateExternalLoanDto,
  ) {
    return this.libraryService.createExternalLoan(
      book_reference_id,
      createExternalLoanDto,
    );
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Loan' })
  @Post('external-return/:book_reference_id')
  createExternalReturn(
    @Param('book_reference_id') book_reference_id: string,
    @Body() createExternalReturnDto: CreateExternalReturnDto,
  ) {
    return this.libraryService.createExternalReturn(
      book_reference_id,
      createExternalReturnDto,
    );
  }
}
