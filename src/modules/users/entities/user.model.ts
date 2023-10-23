import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerModel } from 'src/modules/career/entities/career.model';
import { ProfileModel } from 'src/modules/profiles/entities/profile.model';
import { CareerProgressModel } from 'src/modules/user-courses-progress/entities/career-progress.model';

export class UserModel extends Model {
  static tableName = 'users';

  // Attributes
  id: number;
  email: string;
  ra: string;
  career_code: number;
  encrypted_password: string;
  profile_id: number;

  // Relations
  profile: ProfileModel | null;
  career: CareerModel | null;

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
      career_progress: {
        modelClass: CareerProgressModel,
        relation: Model.HasManyRelation,
        join: {
          from: 'users.id',
          to: 'career_progress.user_id',
        },
      },
      career: {
        modelClass: CareerModel,
        relation: Model.HasOneRelation,
        join: {
          from: 'users.career_code',
          to: 'careers.code',
        },
      },
    };
  }
}
