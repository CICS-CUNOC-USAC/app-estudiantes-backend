import { Module } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { ManualsController } from './manuals.controller';
import { ManualsAdminService } from './manuals.admin.service';

@Module({
  controllers: [ManualsController],
  providers: [ManualsService, ManualsAdminService],
})
export class ManualsModule {}
