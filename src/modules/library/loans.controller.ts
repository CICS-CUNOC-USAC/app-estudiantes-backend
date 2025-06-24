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
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';
import { CreateExternalLoanDto } from './dto/create-external-loan.dto';
import { CreateExternalReturnDto } from './dto/create-external-return.dto';
import { LibraryReceiptModel } from './entities/library_receipt.model';

@ApiTags('Library/Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly libraryService: LibraryService) {}

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('outstanding-loans')
  @ApiResponse({
    status: 200,
    description: 'List of outstanding loans',
    type: LibraryReceiptModel,
    isArray: true
  })
  getOutstandingExternalLoans() {
    return this.libraryService.getOutstandingExternalLoans();
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('simple-loan/:book_reference_id')
  createSimpleLoan(@Param('book_reference_id') book_id: string) {
    return this.libraryService.createSimpleLoan(book_id);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('simple-return/:book_reference_id')
  createSimpleReturn(@Param('book_reference_id') book_id: string) {
    return this.libraryService.createSimpleReturn(book_id);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
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

  @UseGuards(StaffLoginJwtAuthGuard)
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
