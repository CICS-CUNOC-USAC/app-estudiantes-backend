import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PermissionsService } from '../permissions/permissions.service';
import { StaffsService } from '../staffs/staffs.service';

@Module({
  controllers: [CourseController],
  providers: [
    CourseService,
    CaslAbilityFactory,
    PermissionsService,
    StaffsService,
  ],
  exports: [CourseService],
})
export class CourseModule {}
