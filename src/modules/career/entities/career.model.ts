import { ApiProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { PensumModel } from 'src/modules/pensums/entities/pensum.model';

export class CareerModel extends Model {
  static tableName = 'careers';

  @ApiProperty({ example: '58', description: 'Code of the career' })
  code: number;

  @ApiProperty({ example: 'Sistemas', description: 'Name of the career' })
  name: string;

  pensums?: PensumModel[];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      pensums: {
        relation: Model.HasManyRelation,
        modelClass: PensumModel,
        join: {
          from: 'careers.code',
          to: 'pensums.career_code',
        },
      },
    };
  }
}
