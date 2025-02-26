import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { CareerCourseModel } from 'src/modules/career_courses/entities/career_course.entity';
import { ClassroomModel } from 'src/modules/classrooms/entities/classroom.entity';
import { PeriodModel } from 'src/modules/periods/entities/period.entity';
import { SectionModel } from 'src/modules/sections/entities/section.entity';

export class ScheduleModel extends Model {
  static tableName = 'schedules';

  @ApiProperty({ example: 1, description: 'ID of the Schedule' })
  id: number;

  @ApiProperty({ example: '58', description: 'Code of the career' })
  career_code: number;

  @ApiProperty({ example: '2804', description: 'Code of the course' })
  course_code: string;

  @ApiProperty({ example: 2, description: 'ID of the section of the course' })
  section_id: number;

  @ApiProperty({ example: 4, description: 'ID of the classroom of the course' })
  classroom_id: number;

  @ApiProperty({
    example: 'laboratory',
    description: 'Nature of the schedule. Lecture, laboratory or other',
  })
  type: string;

  // Documentation of relations
  @ApiProperty({
    description: 'Career and course details',
    type: () => CareerCourseModel,
  })
  career_course?: CareerCourseModel;

  @ApiProperty({
    type: () => [PeriodModel],
    description: 'Periods associated with the schedule',
  })
  periods?: PeriodModel[];

  @ApiProperty({
    type: () => SectionModel,
    description: 'Section details of the course',
  })
  section?: SectionModel;

  @ApiProperty({
    type: () => ClassroomModel,
    description: 'Classroom details of the course',
  })
  classroom?: ClassroomModel;

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
