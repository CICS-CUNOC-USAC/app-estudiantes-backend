import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.courseService.findOne(code);
  }
  /*
    TODO:
    - Versioning doesn't work for our purposes, let's try nesting the routes manually inside
    the Get decorator
  */
  @Get(':semesterNumber')
  findAllByCareerAndSemester(
    @Param('semesterNumber') semesterNumber: string,
    @Param('careerCode') careerCode: string,
  ) {
    return this.courseService.findAllByCareerAndSemester(
      +semesterNumber,
      +careerCode,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
