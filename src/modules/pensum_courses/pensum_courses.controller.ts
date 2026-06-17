import { Controller, Get, Param } from '@nestjs/common';
import { PensumCoursesService } from './pensum_courses.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '../course/course.service';

@ApiTags('Pensum Courses')
@Controller('pensums/:pensumId/courses')
export class PensumCoursesController {
  constructor(
    private readonly pensumCoursesService: PensumCoursesService,
    private readonly courseService: CourseService,
  ) {}

  @Get('semester/:semesterNumber')
  findCoursesByPensumAndSemester(
    @Param('pensumId') pensumId: string,
    @Param('semesterNumber') semesterNumber: string,
  ) {
    return this.courseService.findAllByPensumAndSemester(
      +semesterNumber,
      +pensumId,
    );
  }

  @Get()
  findCoursesByPensum(@Param('pensumId') pensumId: string) {
    return this.pensumCoursesService.findCoursesByPensumAndSemester(+pensumId);
  }
}
