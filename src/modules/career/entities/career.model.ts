import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerCourseModel } from 'src/modules/career_courses/entities/career_course.entity';
import { CourseModel } from 'src/modules/course/entities/course.model';

export class CareerModel extends Model {
  static tableName = 'careers';

  @ApiProperty({ example: '58', description: 'Code of the career' })
  code: number;

  @ApiProperty({ example: 'Sistemas', description: 'Name of the career' })
  name: string;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: CourseModel,
        join: {
          from: 'careers.code',
          through: {
            modelClass: CareerCourseModel,
            from: 'career_courses.career_code',
            to: 'career_courses.course_code',
          },
          to: 'courses.code',
        },
      },
    };
  }
}
