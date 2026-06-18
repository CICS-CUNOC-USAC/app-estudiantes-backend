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
        builder.whereRaw(
          `EXISTS (SELECT 1 FROM career_fields cf WHERE cf.pensum_id = "pensum_course".pensum_id AND cf.field_number = "pensum_course".field AND cf.common_field = true)`,
        );
      } else {
        builder
          .andWhere('pensum_course:pensum.career_code', selectedCareer)
          .whereRaw(
            `EXISTS (SELECT 1 FROM career_fields cf WHERE cf.pensum_id = "pensum_course".pensum_id AND cf.field_number = "pensum_course".field AND cf.common_field = false)`,
          );
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
        '[periods.weekday, periods.hour, pensum_course.[pensum, course], section, classroom]',
      )
      .modifyGraph('periods', (builder) => {
        builder.select('weekday_id', 'hour_id');
      })
      .modifyGraph('pensum_course', (builder) => {
        builder.select('semester', 'field');
      })
      .modifyGraph('pensum_course.course', (builder) => {
        builder.select('name');
      })
      .modifyGraph('[periods.weekday, section, classroom]', (builder) => {
        builder.select('name');
      });
  }

  async findByDayNames(dayNames: string[], queryDto: ScheduleQueryDto) {
    const weekdays = await this.scheduleModel
      .knex()('weekdays')
      .whereIn('name', dayNames)
      .select('id');
    const dayIds = weekdays.map((w) => w.id);
    return this.findByDays(dayIds, queryDto);
  }

  async findByDays(days, queryDto: ScheduleQueryDto) {
    try {
    const schedules = await this.scheduleModel
      .query()
      .withGraphJoined(
        '[periods.[weekday,hour], pensum_course.[pensum.career, course], section, classroom]',
      )
      .select(
        'schedules.*',
        raw(
          `(SELECT cf.name FROM career_fields cf WHERE cf.pensum_id = "pensum_course".pensum_id AND cf.field_number = "pensum_course".field LIMIT 1) as field_name`,
        ),
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
      .modifyGraph('pensum_course', (builder) => {
        builder.select('semester', 'field');
      })
      .modifyGraph('pensum_course.course', (builder) => {
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
    } catch (error) {
      console.error('DEBUG findByDays error:', error);
      throw error;
    }
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
