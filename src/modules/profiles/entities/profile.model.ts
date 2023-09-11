import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { UserModel } from 'src/modules/users/entities/user.model';

export class ProfileModel extends Model {
  static tableName = 'profiles';

  id: number;
  first_name: string;
  last_name: string;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'profiles.id',
          to: 'users.profile_id',
        },
      },
    };
  }
}
