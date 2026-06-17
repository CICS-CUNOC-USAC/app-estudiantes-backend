import { Module } from '@nestjs/common';
import { PensumsService } from './pensums.service';
import { PensumsController } from './pensums.controller';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PermissionsService } from '../permissions/permissions.service';
import { StaffsService } from '../staffs/staffs.service';

@Module({
  controllers: [PensumsController],
  providers: [
    PensumsService,
    CaslAbilityFactory,
    PermissionsService,
    StaffsService,
  ],
  exports: [PensumsService],
})
export class PensumsModule {}
