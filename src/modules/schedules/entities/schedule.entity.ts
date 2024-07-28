import { Model } from 'objection';
import { ClassroomModel } from 'src/modules/classrooms/entities/classroom.entity';
import { PeriodModel } from 'src/modules/periods/entities/period.entity';
import { SectionModel } from 'src/modules/sections/entities/section.entity';

export class ScheduleModel extends Model {
  static tableName = 'schedules';

  id: number;
  career_code: number;
  course_code: string;
  section_id: number;
  classroom_id: number;

  static get relationMappings() {
    return {
      periods: {
        relation: Model.ManyToManyRelation,
        modelClass: PeriodModel,
        join: {
          from: 'schedules.id',
          through: {
            from: 'period_schedule.period_id',
            to: 'period_schedule.schedule_id',
          },
          to: 'periods.id',
        },
      },
      section: {
        relation: Model.BelongsToOneRelation,
        modelClass: SectionModel,
        join: {
          from: 'schedules.section_id',
          to: 'section.id',
        },
      },
      classroom: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassroomModel,
        join: {
          from: 'schedules.classroom_id',
          to: 'classrooms.id',
        },
      },
    };
  }
}
