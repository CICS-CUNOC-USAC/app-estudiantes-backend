import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { ProfileModel } from 'src/modules/profiles/entities/profile.model';

export class UserModel extends Model {
  static tableName = 'users';

  id: number;
  email: string;
  ra: string;
  encrypted_password: string;
  profile_id: number;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      profile: {
        modelClass: ProfileModel,
        relation: Model.HasOneRelation,
        join: {
          from: 'users.profile_id',
          to: 'profiles.id',
        },
      },
    };
  }
}