import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { BooksController } from './books.controller';
import { MediaModule } from '../media/media.module';
import { LoansController } from './loans.controller';
import { CategoriesController } from './categories.controller';
import { CaslModule } from '../casl/casl.module';
import { StaffsModule } from '../staffs/staffs.module';

@Module({
  controllers: [BooksController, LoansController, CategoriesController],
  providers: [LibraryService],
  imports: [MediaModule, CaslModule, StaffsModule],
})
export class LibraryModule {}
