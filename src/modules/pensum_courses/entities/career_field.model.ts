import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerModel } from 'src/modules/career/entities/career.model';

export class CareerFieldModel extends Model {
  static tableName = 'career_fields';

  career_code: number;
  field_number: number;
  name: string;
  common_field: boolean;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      career: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerModel,
        join: {
          from: 'career_fields.career_code',
          to: 'careers.code',
        },
      },
    };
  }
}
