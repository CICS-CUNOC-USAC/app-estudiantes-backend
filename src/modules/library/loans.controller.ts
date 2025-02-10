import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LibraryService } from './library.service';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';

@ApiTags('Library/Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly libraryService: LibraryService) {}

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
}
