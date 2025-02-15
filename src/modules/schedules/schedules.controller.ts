import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScheduleModel } from './entities/schedule.entity';
import { ScheduleQueryDto } from './dto/schedule-query.dto';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get('lectures')
  @ApiResponse({
    status: 200,
    description:
      'Find all Schedules of days of lectures (Monday, Wednesday, Friday)',
    type: ScheduleModel,
  })
  findCourses(@Query() queryDto: ScheduleQueryDto) {
    return this.schedulesService.findByDays([1, 3, 5], queryDto);
  }

  @Get('laboratories')
  @ApiResponse({
    status: 200,
    description:
      'Find all Schedules of days of laboratories (Tuesday, Thursday)',
    type: ScheduleModel,
  })
  findLaboratories(@Query() queryDto: ScheduleQueryDto) {
    return this.schedulesService.findByDays([2, 4], queryDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Find a Schedule based on its id',
    type: ScheduleModel,
  })
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}
