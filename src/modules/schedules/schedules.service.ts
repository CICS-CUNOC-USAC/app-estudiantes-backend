import { Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { BaseService } from 'src/core/utils/base-service';
import { QueryBuilder, Model, ModelClass } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { ScheduleModel } from './entities/schedule.entity';

@Injectable()
export class SchedulesService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(ScheduleModel.name)
    private scheduleModel: ModelClass<ScheduleModel>,
  ) {
    super(SchedulesService.name);
  }

  create(createScheduleDto: CreateScheduleDto) {
    return 'This action adds a new schedule';
  }

  findAll() {
    return `This action returns all schedules`;
  }

  async findOne(id: number) {
    return await this.scheduleModel
      .query()
      .findById(id)
      .withGraphFetched(
        '[periods.weekday, career_course.course, section, classroom]',
      )
      .modifyGraph('periods', (builder) => {
        builder.select('weekday_id', 'start_time', 'end_time');
      })
      .modifyGraph('career_course', (builder) => {
        builder.select('semester', 'field');
      })
      .modifyGraph('career_course.course', (builder) => {
        builder.select('name');
      })
      .modifyGraph('[periods.weekday, section, classroom]', (builder) => {
        builder.select('name');
      });
  }

  async findCourses() {
    return await this.scheduleModel
      .query()
      .withGraphJoined(
        '[periods.weekday, career_course.course, section, classroom]',
      )
      .modifyGraph('periods', (builder) => {
        builder.select('weekday_id', 'start_time', 'end_time');
      })
      .modifyGraph('career_course', (builder) => {
        builder.select('semester', 'field');
      })
      .modifyGraph('career_course.course', (builder) => {
        builder.select('name');
      })
      .modifyGraph('[periods.weekday, section, classroom]', (builder) => {
        builder.select('name');
      })
      .whereIn('periods:weekday.id', [1, 3, 5]);
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
