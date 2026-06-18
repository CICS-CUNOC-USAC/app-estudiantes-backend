import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { PensumCoursePrerequisiteModel } from './pensum_course_prerequisite.model';

export class CreditsPrerequisiteModel extends Model {
  static tableName = 'credits_prerequisites';

  @ApiProperty({ example: 1, description: 'ID of the credits prerequisite' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the parent prerequisite rule' })
  career_course_prerequisite_id: number;

  @ApiProperty({ example: 30, description: 'Minimum credits required' })
  credits: number;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      prerequisiteRule: {
        relation: Model.BelongsToOneRelation,
        modelClass: PensumCoursePrerequisiteModel,
        join: {
          from: 'credits_prerequisites.career_course_prerequisite_id',
          to: 'pensum_courses_prerequisites.id',
        },
      },
    };
  }
}
