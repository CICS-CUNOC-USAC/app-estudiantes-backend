import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { PensumCourseModel } from 'src/modules/pensum_courses/entities/pensum_course.entity';
import { ClassroomModel } from 'src/modules/classrooms/entities/classroom.entity';
import { PeriodModel } from 'src/modules/periods/entities/period.entity';
import { SectionModel } from 'src/modules/sections/entities/section.entity';

export class ScheduleModel extends Model {
  static tableName = 'schedules';

  @ApiProperty({ example: 1, description: 'ID of the Schedule' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the pensum' })
  pensum_id: number;

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

  @ApiProperty({
    description: 'Pensum course details',
    type: () => PensumCourseModel,
  })
  pensum_course?: PensumCourseModel;

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
      pensum_course: {
        relation: Model.BelongsToOneRelation,
        modelClass: PensumCourseModel,
        join: {
          from: ['schedules.pensum_id', 'schedules.course_code'],
          to: ['pensum_courses.pensum_id', 'pensum_courses.course_code'],
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
