import { Controller, Get, Param } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Get()
  findAll() {
    return this.classroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomsService.findOne(+id);
  }
}
