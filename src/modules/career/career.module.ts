import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { CareerFieldsController } from './career-fields.controller';
import { CareerFieldsService } from './career-fields.service';
import { CourseModule } from '../course/course.module';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PermissionsService } from '../permissions/permissions.service';
import { StaffsService } from '../staffs/staffs.service';

@Module({
  controllers: [CareerController, CareerFieldsController],
  providers: [
    CareerService,
    CareerFieldsService,
    CaslAbilityFactory,
    PermissionsService,
    StaffsService,
  ],
  imports: [CourseModule],
})
export class CareerModule {}
