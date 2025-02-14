import { Model } from 'objection';
import { MediaModel } from 'src/modules/media/entities/media.model';
import { LibraryReferenceModel } from './library_reference.model';
import { BookModel } from './book.model';

export class BookCategoryModel extends Model {
  static tableName = 'book_categories';

  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      book: {
        relation: Model.HasManyRelation,
        modelClass: BookModel,
        join: {
          from: 'book_categories.id',
          to: 'books.category_id',
        },
      },
    };
  }
}
