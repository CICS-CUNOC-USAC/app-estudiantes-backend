import { Model } from 'objection';
import { LibraryReferenceModel } from './library_reference.model';
import { UserModel } from 'src/modules/users/entities/user.model';

export class LibraryReceiptModel extends Model {
  static tableName = 'library_receipts';

  id: number;
  ra: string;
  personal_id: string;
  place: string;
  library_reference_id: string;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      library_reference: {
        relation: Model.BelongsToOneRelation,
        modelClass: LibraryReferenceModel,
        join: {
          from: 'library_receipts.library_reference_id',
          to: 'library_references.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'library_receipts.ra',
          to: 'users.ra',
        },
      },
    };
  }
}
