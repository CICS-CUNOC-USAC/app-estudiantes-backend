import { Module } from '@nestjs/common';
import { RoleDetailsService } from './role-details.service';
import { RoleDetailsController } from './role-details.controller';

@Module({
  controllers: [RoleDetailsController],
  providers: [RoleDetailsService],
})
export class RoleDetailsModule {}
