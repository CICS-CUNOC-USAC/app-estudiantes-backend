import { Module } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { ManualsController } from './manuals.controller';
import { ManualsAdminService } from './manuals.admin.service';
import { MediaModule } from '../media/media.module';

@Module({
  controllers: [ManualsController],
  providers: [ManualsService, ManualsAdminService],
  imports: [MediaModule],
})
export class ManualsModule {}
