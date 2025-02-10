import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { BooksController } from './books.controller';
import { MediaModule } from '../media/media.module';
import { LoansController } from './loans.controller';

@Module({
  controllers: [BooksController, LoansController],
  providers: [LibraryService],
  imports: [MediaModule],
})
export class LibraryModule {}
