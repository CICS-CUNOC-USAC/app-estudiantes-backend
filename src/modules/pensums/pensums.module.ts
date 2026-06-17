import { Module } from '@nestjs/common';
import { PensumsService } from './pensums.service';
import { PensumsController } from './pensums.controller';

@Module({
  controllers: [PensumsController],
  providers: [PensumsService],
  exports: [PensumsService],
})
export class PensumsModule {}
