import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PensumCoursesService } from './pensum_courses.service';
import { PrerequisitesService } from './prerequisites.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '../course/course.service';
import { PermissionsGuard } from 'src/core/guards/permissions/permissions.guard';
import { CheckAbilities } from 'src/core/decorators/abilities/abilities.decorator';
import { CreatePrerequisiteDto } from './dto/create-prerequisite.dto';
import { UpdatePrerequisiteDto } from './dto/update-prerequisite.dto';
import { AddPensumCourseDto } from './dto/add-pensum-course.dto';

@ApiTags('Pensum Courses')
@Controller('pensums/:pensumId/courses')
export class PensumCoursesController {
  constructor(
    private readonly pensumCoursesService: PensumCoursesService,
    private readonly courseService: CourseService,
    private readonly prerequisitesService: PrerequisitesService,
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

  @Post()
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  addCourseToPensum(
    @Param('pensumId') pensumId: string,
    @Body(new ValidationPipe({ transform: true }))
    dto: AddPensumCourseDto,
  ) {
    return this.pensumCoursesService.addCourseToPensum(+pensumId, dto);
  }

  @Delete(':courseCode')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  removeCourseFromPensum(
    @Param('pensumId') pensumId: string,
    @Param('courseCode') courseCode: string,
  ) {
    return this.pensumCoursesService.removeCourseFromPensum(+pensumId, courseCode);
  }

  @Get(':courseCode/prerequisites')
  findPrerequisites(
    @Param('pensumId') pensumId: string,
    @Param('courseCode') courseCode: string,
  ) {
    return this.prerequisitesService.findByPensumAndCourse(+pensumId, courseCode);
  }

  @Post(':courseCode/prerequisites')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  createPrerequisite(
    @Param('pensumId') pensumId: string,
    @Param('courseCode') courseCode: string,
    @Body(new ValidationPipe({ transform: true }))
    dto: CreatePrerequisiteDto,
  ) {
    return this.prerequisitesService.create(+pensumId, courseCode, dto);
  }

  @Patch(':courseCode/prerequisites/:id')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  updatePrerequisite(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    dto: UpdatePrerequisiteDto,
  ) {
    return this.prerequisitesService.update(+id, dto);
  }

  @Delete(':courseCode/prerequisites/:id')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  removePrerequisite(@Param('id') id: string) {
    return this.prerequisitesService.remove(+id);
  }
}
