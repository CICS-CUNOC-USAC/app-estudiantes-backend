import { Model } from 'objection';
import { CareerCourseModel } from 'src/modules/career_courses/entities/career_course.entity';
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
      career_course: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerCourseModel,
        join: {
          from: ['schedules.career_code', 'schedules.course_code'],
          to: ['career_courses.career_code', 'career_courses.course_code'],
        },
      },
      periods: {
        relation: Model.ManyToManyRelation,
        modelClass: PeriodModel,
        join: {
          from: 'schedules.id',
          through: {
            from: 'period_schedule.schedule_id',
            to: 'period_schedule.period_id',
          },
          to: 'periods.id',
        },
      },
      section: {
        relation: Model.BelongsToOneRelation,
        modelClass: SectionModel,
        join: {
          from: 'schedules.section_id',
          to: 'sections.id',
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
