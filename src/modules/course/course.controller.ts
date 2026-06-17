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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
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

  @Get(':code/pensum/:pensumId')
  findOneWithPensum(
    @Param('code') code: string,
    @Param('pensumId') pensumId: number,
  ) {
    return this.courseService.findOneWithPensum(code, pensumId);
  }

  @Get('pensum/:pensumId/semester/:semesterNumber')
  findAllByPensumAndSemester(
    @Param('semesterNumber') semesterNumber: string,
    @Param('pensumId') pensumId: string,
  ) {
    return this.courseService.findAllByPensumAndSemester(
      +semesterNumber,
      +pensumId,
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
