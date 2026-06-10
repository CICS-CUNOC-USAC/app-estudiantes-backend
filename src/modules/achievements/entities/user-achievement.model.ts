import { Model } from 'objection';
import { UserModel } from 'src/modules/users/entities/user.model';
import { AchievementModel } from './achievement.model';

export class UserAchievementModel extends Model {
  static tableName = 'user_achievements';
  static idColumn = 'id';

  id: number;
  user_id: number;
  achievement_id: number;
  grade: number | null;
  approved_at: Date;
  created_at: Date;

  user: UserModel;
  achievement: AchievementModel;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'user_achievements.user_id',
          to: 'users.id',
        },
      },
      achievement: {
        relation: Model.BelongsToOneRelation,
        modelClass: AchievementModel,
        join: {
          from: 'user_achievements.achievement_id',
          to: 'achievements.id',
        },
      },
    };
  }
}