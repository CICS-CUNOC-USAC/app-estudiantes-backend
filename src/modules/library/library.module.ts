import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { LibraryAdminService } from './library.admin.service';
import { MediaModule } from '../media/media.module';

@Module({
  controllers: [LibraryController],
  providers: [LibraryService, LibraryAdminService],
  imports: [MediaModule],
})
export class LibraryModule {}
