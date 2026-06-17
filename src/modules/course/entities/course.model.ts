import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { PensumCourseModel } from 'src/modules/pensum_courses/entities/pensum_course.entity';
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
      pensum_courses: {
        relation: Model.HasManyRelation,
        modelClass: PensumCourseModel,
        join: {
          from: 'courses.code',
          to: 'pensum_courses.course_code',
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
