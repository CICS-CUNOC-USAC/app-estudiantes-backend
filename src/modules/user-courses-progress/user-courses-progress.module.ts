import { Module } from '@nestjs/common';
import { UserCoursesProgressService } from './user-courses-progress.service';
import { UserCoursesProgressController } from './user-courses-progress.controller';
import { CareerCoursesModule } from '../career_courses/career_courses.module';

@Module({
  controllers: [UserCoursesProgressController],
  providers: [UserCoursesProgressService],
  imports: [CareerCoursesModule],
  exports: [UserCoursesProgressService],
})
export class UserCoursesProgressModule {}
