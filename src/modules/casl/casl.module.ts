import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionsService } from '../permissions/permissions.service';

@Module({
  providers: [CaslAbilityFactory, PermissionsService],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
