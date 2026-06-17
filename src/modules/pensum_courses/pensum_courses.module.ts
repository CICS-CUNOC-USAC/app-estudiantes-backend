import { Module } from '@nestjs/common';
import { PensumCoursesService } from './pensum_courses.service';
import { PensumCoursesController } from './pensum_courses.controller';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [PensumCoursesController],
  providers: [PensumCoursesService],
  imports: [CourseModule],
  exports: [PensumCoursesService],
})
export class PensumCoursesModule {}
