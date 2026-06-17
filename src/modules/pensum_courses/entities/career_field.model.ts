import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { PensumModel } from 'src/modules/pensums/entities/pensum.model';

export class CareerFieldModel extends Model {
  static tableName = 'career_fields';

  pensum_id: number;
  field_number: number;
  name: string;
  common_field: boolean;

  static get idColumn() {
    return ['pensum_id', 'field_number'];
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      pensum: {
        relation: Model.BelongsToOneRelation,
        modelClass: PensumModel,
        join: {
          from: 'career_fields.pensum_id',
          to: 'pensums.id',
        },
      },
    };
  }
}
