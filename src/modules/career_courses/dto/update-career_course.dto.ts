import { PartialType } from '@nestjs/mapped-types';
import { CreateCareerCourseDto } from './create-career_course.dto';

export class UpdateCareerCourseDto extends PartialType(CreateCareerCourseDto) {}
