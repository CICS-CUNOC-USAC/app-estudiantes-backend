import { Model } from 'objection';
import { MediaModel } from 'src/modules/media/entities/media.model';

export class BookModel extends Model {
  static tableName = 'books';

  id: number;
  name: string;
  author: string;
  description: string;
  file: string;
  source_url: string;
  media_id: number;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      media: {
        relation: Model.HasOneRelation,
        modelClass: MediaModel,
        join: {
          from: 'books.media_id',
          to: 'media.id',
        },
      },
    };
  }
}
