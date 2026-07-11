import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CoursePrerequisiteModel } from './course_prerequisite.model';
import { CreditsPrerequisiteModel } from './credits_prerequisite.model';

export class PensumCoursePrerequisiteModel extends Model {
  static tableName = 'pensum_courses_prerequisites';

  @ApiProperty({ example: 1, description: 'ID of the prerequisite rule' })
  id: number;

  @ApiProperty({ example: '2796', description: 'Code of the course that has this prerequisite' })
  course_code: string;

  @ApiProperty({ example: true, description: 'Whether the prerequisite is a course (true) or credits (false)' })
  is_course: boolean;

  @ApiProperty({ example: 1, description: 'ID of the pensum' })
  pensum_id: number;

  coursePrerequisites?: CoursePrerequisiteModel[];
  creditsPrerequisites?: CreditsPrerequisiteModel[];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      coursePrerequisites: {
        relation: Model.HasManyRelation,
        modelClass: CoursePrerequisiteModel,
        join: {
          from: 'pensum_courses_prerequisites.id',
          to: 'courses_prerequisites.career_course_prerequisite_id',
        },
      },
      creditsPrerequisites: {
        relation: Model.HasManyRelation,
        modelClass: CreditsPrerequisiteModel,
        join: {
          from: 'pensum_courses_prerequisites.id',
          to: 'credits_prerequisites.career_course_prerequisite_id',
        },
      },
    };
  }
}
