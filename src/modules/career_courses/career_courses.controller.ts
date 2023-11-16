import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { CareerCoursesService } from './career_courses.service';
import { CreateCareerCourseDto } from './dto/create-career_course.dto';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '../course/course.service';

@ApiTags('Career Courses')
@Controller('career-courses')
export class CareerCoursesController {
  constructor(
    private readonly careerCoursesService: CareerCoursesService,
    private readonly courseService: CourseService,
  ) {}

  @Get(':careerCode/semester/:semesterNumber')
  findCoursesByCareerAndSemester(
    @Param('careerCode') careerCode: string,
    @Param('semesterNumber') semesterNumber: string,
  ) {
    return this.courseService.findAllByCareerAndSemester(
      +semesterNumber,
      +careerCode,
    );
  }

  @Get(':careerCode')
  findCoursesByCareer(@Param('careerCode') careerCode: string) {
    return this.careerCoursesService.findCoursesByCareerAndSemester(
      +careerCode,
    );
  }

  @Get()
  findAll() {
    return this.careerCoursesService.findAll();
  }
}
