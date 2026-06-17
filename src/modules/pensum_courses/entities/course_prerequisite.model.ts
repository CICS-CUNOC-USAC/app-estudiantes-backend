import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CourseModel } from 'src/modules/course/entities/course.model';
import { PensumCoursePrerequisiteModel } from './pensum_course_prerequisite.model';

export class CoursePrerequisiteModel extends Model {
  static tableName = 'courses_prerequisites';

  @ApiProperty({ example: 1, description: 'ID of the course prerequisite' })
  id: number;

  @ApiProperty({ example: '169', description: 'Code of the prerequisite course' })
  course_code: string;

  @ApiProperty({ example: 1, description: 'ID of the parent prerequisite rule' })
  career_course_prerequisite_id: number;

  course?: CourseModel;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      prerequisiteRule: {
        relation: Model.BelongsToOneRelation,
        modelClass: PensumCoursePrerequisiteModel,
        join: {
          from: 'courses_prerequisites.career_course_prerequisite_id',
          to: 'pensum_courses_prerequisites.id',
        },
      },
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseModel,
        join: {
          from: 'courses_prerequisites.course_code',
          to: 'courses.code',
        },
      },
    };
  }
}
