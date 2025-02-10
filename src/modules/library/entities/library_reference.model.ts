import { Model } from 'objection';
import { BookModel } from './book.model';

export class LibraryReferenceModel extends Model {
  static tableName = 'library_references';

  id: string;
  book_id: number;
  total_availability: number;
  current_availability: number;
  edition: string;
  location: string;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: BookModel,
        join: {
          from: 'library_references.book_id',
          to: 'books.id',
        },
      },
    };
  }
}
