import { Model } from 'objection';
import { LibraryReferenceModel } from './library_reference.model';
import { UserModel } from 'src/modules/users/entities/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class LibraryReceiptModel extends Model {
  static tableName = 'library_receipts';

  @ApiProperty()
  id: number;
  @ApiProperty()
  ra: string;
  @ApiProperty()
  personal_id: string;
  @ApiProperty()
  place: string;
  @ApiProperty()
  library_reference_id: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
  @ApiProperty()
  returned_at: Date;

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
