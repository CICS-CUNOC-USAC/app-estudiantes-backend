import * as path from 'path';
import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';

export class CareerModel extends Model {
  static tableName = 'careers';

  @ApiProperty({ example: '58', description: 'Code of the career' })
  code: number;

  @ApiProperty({ example: 'Sistemas', description: 'Name of the career' })
  name: string;

  pensums?: any[];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      pensums: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '..', '..', 'pensums', 'entities', 'pensum.model'),
        join: {
          from: 'careers.code',
          to: 'pensums.career_code',
        },
      },
    };
  }
}
