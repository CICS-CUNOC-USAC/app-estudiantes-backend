import * as path from 'path';
import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';

export class PensumModel extends Model {
  static tableName = 'pensums';

  @ApiProperty({ example: 1, description: 'ID of the pensum' })
  id: number;

  @ApiProperty({ example: 58, description: 'Code of the career' })
  career_code: number;

  @ApiProperty({ example: 2012, description: 'Year of the pensum' })
  year: number;

  @ApiProperty({ example: true, description: 'Whether the pensum is active' })
  active: boolean;

  career?: any;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      career: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '..', '..', 'career', 'entities', 'career.model'),
        join: {
          from: 'pensums.career_code',
          to: 'careers.code',
        },
      },
      pensum_courses: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '..', '..', 'pensum_courses', 'entities', 'pensum_course.entity'),
        join: {
          from: 'pensums.id',
          to: 'pensum_courses.pensum_id',
        },
      },
    };
  }
}
