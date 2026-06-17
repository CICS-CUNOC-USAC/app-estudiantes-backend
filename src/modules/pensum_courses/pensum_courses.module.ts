import { Module } from '@nestjs/common';
import { PensumCoursesService } from './pensum_courses.service';
import { PensumCoursesController } from './pensum_courses.controller';
import { PrerequisitesService } from './prerequisites.service';
import { CourseModule } from '../course/course.module';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PermissionsService } from '../permissions/permissions.service';
import { StaffsService } from '../staffs/staffs.service';

@Module({
  controllers: [PensumCoursesController],
  providers: [
    PensumCoursesService,
    PrerequisitesService,
    CaslAbilityFactory,
    PermissionsService,
    StaffsService,
  ],
  imports: [CourseModule],
  exports: [PensumCoursesService],
})
export class PensumCoursesModule {}
