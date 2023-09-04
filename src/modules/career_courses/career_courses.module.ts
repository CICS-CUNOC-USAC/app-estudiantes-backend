import { Module } from '@nestjs/common';
import { CareerCoursesService } from './career_courses.service';
import { CareerCoursesController } from './career_courses.controller';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [CareerCoursesController],
  providers: [CareerCoursesService],
  imports: [CourseModule],
})
export class CareerCoursesModule {}
