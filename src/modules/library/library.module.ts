import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { MediaModule } from '../media/media.module';

@Module({
  controllers: [LibraryController],
  providers: [LibraryService],
  imports: [MediaModule],
})
export class LibraryModule {}
