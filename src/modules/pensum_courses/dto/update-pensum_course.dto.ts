import { PartialType } from '@nestjs/mapped-types';
import { CreatePensumCourseDto } from './create-pensum_course.dto';

export class UpdatePensumCourseDto extends PartialType(CreatePensumCourseDto) {}
