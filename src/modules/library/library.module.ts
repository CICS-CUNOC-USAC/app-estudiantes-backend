import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { LoansService } from './loans.service';
import { BooksController } from './books.controller';
import { MediaModule } from '../media/media.module';
import { LoansController } from './loans.controller';
import { CategoriesController } from './categories.controller';
import { CaslModule } from '../casl/casl.module';
import { StaffsModule } from '../staffs/staffs.module';

@Module({
  controllers: [BooksController, LoansController, CategoriesController],
  providers: [BooksService, LoansService],
  imports: [MediaModule, CaslModule, StaffsModule],
})
export class LibraryModule {}
