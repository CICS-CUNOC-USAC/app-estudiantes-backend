import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    createCourseDto: CreateCourseDto,
  ) {
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

  @Get(':code/:careerCode')
  findOneWithCareer(
    @Param('code') code: string,
    @Param('careerCode') careerCode: number,
  ) {
    return this.courseService.findOneWithCareer(code, careerCode);
  }

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
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
