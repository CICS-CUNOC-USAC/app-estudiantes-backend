import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerModel } from 'src/modules/career/entities/career.model';

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

  career?: CareerModel;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    const {
      PensumCourseModel,
    } = require('src/modules/pensum_courses/entities/pensum_course.entity');

    return {
      career: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerModel,
        join: {
          from: 'pensums.career_code',
          to: 'careers.code',
        },
      },
      pensum_courses: {
        relation: Model.HasManyRelation,
        modelClass: PensumCourseModel,
        join: {
          from: 'pensums.id',
          to: 'pensum_courses.pensum_id',
        },
      },
    };
  }
}
