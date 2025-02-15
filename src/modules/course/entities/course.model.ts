import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerModel } from 'src/modules/career/entities/career.model';
import { CourseSemesterProgressModel } from 'src/modules/user-courses-progress/entities/course-semester-progress.model';

export class CourseModel extends Model {
  static tableName = 'courses';

  @ApiProperty({ example: '2804', description: 'Code of the course' })
  code: string;

  @ApiProperty({
    example: 'Introduccion a la Programacion y Computacion 1',
    description: 'Name of the course',
  })
  name: string;

  @ApiProperty({
    example: '',
    description: 'Description of the course',
  })
  description: string;

  @ApiProperty({
    example: 3,
    description: 'Credits given by the course',
  })
  credits: number;

  static get idColumn() {
    return 'code';
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      careers: {
        relation: Model.ManyToManyRelation,
        modelClass: CareerModel,
        join: {
          from: 'courses.code',
          through: {
            from: 'career_courses.course_code',
            to: 'career_courses.career_code',
          },
          to: 'careers.code',
        },
      },
      courses_semester_progress: {
        modelClass: CourseSemesterProgressModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'courses.code',
          to: 'courses_semester_progress.course_code',
        },
      },
    };
  }
}
