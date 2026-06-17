import { Module } from '@nestjs/common';
import { UserCoursesProgressService } from './user-courses-progress.service';
import { UserCoursesProgressController } from './user-courses-progress.controller';
import { PensumCoursesModule } from '../pensum_courses/pensum_courses.module';
import { PensumsModule } from '../pensums/pensums.module';

@Module({
  controllers: [UserCoursesProgressController],
  providers: [UserCoursesProgressService],
  imports: [PensumCoursesModule, PensumsModule],
  exports: [UserCoursesProgressService],
})
export class UserCoursesProgressModule {}
