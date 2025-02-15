import { Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { BaseService } from 'src/core/utils/base-service';
import { QueryBuilder, Model, ModelClass, raw } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { ScheduleModel } from './entities/schedule.entity';
import { ScheduleQueryDto } from './dto/schedule-query.dto';

@Injectable()
export class SchedulesService extends BaseService {
  queryFilters(
    queryDto: ScheduleQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (queryDto.selection) {
      const selectionArray = JSON.parse(
        queryDto.selection as unknown as string,
      );
      builder.andWhere('periods:hour.id', 'in', selectionArray);
    }
    if (queryDto.career) {
      const selectedCareer = Number.parseInt(queryDto.career as any);
      if (selectedCareer === 0) {
        builder.andWhere('career_course:career_field.common_field', true);
      } else {
        builder
          .andWhere('schedules.career_code', selectedCareer)
          .andWhere('career_course:career_field.common_field', false);
      }
    }
    return builder;
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
        '[periods.weekday, periods.hour, career_course, career_course.course, section, classroom]',
      )
      .modifyGraph('periods', (builder) => {
        builder.select('weekday_id', 'hour_id');
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

  async findByDays(days, queryDto: ScheduleQueryDto) {
    const schedules = await this.scheduleModel
      .query()
      .withGraphJoined(
        '[periods.[weekday,hour], career_course.[career, course, career_field], section, classroom]',
      )
      .modifyGraph('periods', (builder) => {
        builder.select('weekday_id');
      })
      .modifyGraph('periods.hour', (builder) => {
        builder.select(
          'id',
          raw("TO_CHAR(start_time, 'HH24:MI')").as('start_time'),
          raw("TO_CHAR(end_time, 'HH24:MI')").as('end_time'),
        );
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
      .whereIn('periods:weekday.id', days)
      .where((builder) => this.queryFilters(queryDto, builder));

    schedules.forEach((schedule) => {
      const groupedPeriods = schedule.periods.reduce((acc, period: any) => {
        const existing = acc.find((p) => p.weekday_id === period.weekday_id);
        if (existing) {
          existing.hours.push(period.hour);
        } else {
          acc.push({
            weekday_id: period.weekday_id,
            weekday: period.weekday,
            hours: [period.hour],
          });
        }
        return acc;
      }, []);
      schedule.periods = groupedPeriods;
    });

    return schedules;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
