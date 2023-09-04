import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [CareerController],
  providers: [CareerService],
  imports: [CourseModule],
})
export class CareerModule {}
