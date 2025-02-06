import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PermissionsService } from '../permissions/permissions.service';
import { StaffsService } from '../staffs/staffs.service';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    CaslAbilityFactory,
    PermissionsService,
    StaffsService,
  ],
})
export class RolesModule {}
