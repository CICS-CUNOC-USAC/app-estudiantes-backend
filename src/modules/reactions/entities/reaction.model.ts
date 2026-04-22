import { Model } from 'objection';
import { UserModel } from 'src/modules/users/entities/user.model';

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  HAHA = 'haha',
  SAD = 'sad',
  ANGRY = 'angry',
}

export class ReactionModel extends Model {
  static tableName = 'reactions';

  id: number;
  type: ReactionType;
  strapi_post_id: string;
  user_id: number;
  created_at: Date;

  user: UserModel;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'reactions.user_id',
          to: 'users.id',
        },
      },
    };
  }
}
