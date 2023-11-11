import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { MediaModel } from 'src/modules/media/entities/media.model';

export class ManualModel extends Model {
  static tableName = 'manuals';

  id: number;
  name: string;
  description: string;
  file: string;
  url: string;
  media_id: number;
  created_at: Date;
  updated_at: Date;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    // Insert relation mappings here
    return {
      media: {
        relation: Model.HasOneRelation,
        modelClass: MediaModel,
        join: {
          from: 'manuals.media_id',
          to: 'media.id',
        },
      },
    };
  }
}
