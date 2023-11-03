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

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    createCareerCourseDto: CreateCareerCourseDto,
  ) {
    return this.careerCoursesService.create(createCareerCourseDto);
  }

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.careerCoursesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body(new ValidationPipe({ transform: true })) updateCareerCourseDto: UpdateCareerCourseDto,
  // ) {
  //   return this.careerCoursesService.update(+id, updateCareerCourseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.careerCoursesService.remove(+id);
  // }
}
