import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

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
}
