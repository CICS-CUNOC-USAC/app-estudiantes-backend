import { Model } from 'objection';
import { UserModel } from 'src/modules/users/entities/user.model';

export class CommentModel extends Model {
  static tableName = 'comments';

  id: number;
  content: string;
  strapi_post_id: string;
  user_id: number;
  parent_id: number | null;
  created_at: Date;
  updated_at: Date;

  user: UserModel;
  parent: CommentModel | null;
  replies: CommentModel[];

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'comments.user_id',
          to: 'users.id',
        },
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: CommentModel,
        join: {
          from: 'comments.parent_id',
          to: 'comments.id',
        },
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: 'comments.id',
          to: 'comments.parent_id',
        },
      },
    };
  }
}
