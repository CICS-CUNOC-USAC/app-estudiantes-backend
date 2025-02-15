import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerModel } from 'src/modules/career/entities/career.model';
import { CourseModel } from 'src/modules/course/entities/course.model';
import { CareerFieldModel } from './career_field.model';
import { ApiProperty } from '@nestjs/swagger';

export class CareerCourseModel extends Model {
  static tableName = 'career_courses';

  @ApiProperty({ example: '58', description: 'Code of the career' })
  career_code: number;

  @ApiProperty({ example: '2804', description: 'Code of the course' })
  course_code: string;

  @ApiProperty({
    example: 2,
    description: 'Semester of the course for the career',
  })
  semester: number;

  @ApiProperty({
    example: 1,
    description: 'Field of the course for the career',
  })
  field: number;

  @ApiProperty({
    example: true,
    description: 'Mandatory nature of the course for the career',
  })
  mandatory: boolean;

  @ApiProperty({
    description: 'Career details',
    type: () => CareerModel,
  })
  career?: CareerModel;

  @ApiProperty({
    description: 'Course details',
    type: () => CourseModel,
  })
  course?: CourseModel;

  static get idColumn() {
    return ['career_code', 'course_code'];
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      career: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerModel,
        join: {
          from: 'career_courses.career_code',
          to: 'careers.code',
        },
      },
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseModel,
        join: {
          from: 'career_courses.course_code',
          to: 'courses.code',
        },
      },
      career_field: {
        relation: Model.HasOneRelation,
        modelClass: CareerFieldModel,
        join: {
          from: ['career_courses.career_code', 'career_courses.field'], // Composite key from CareerCourseModel
          to: ['career_fields.career_code', 'career_fields.field_number'], // Composite key in CareerFieldModel
        },
      },
    };
  }
}
