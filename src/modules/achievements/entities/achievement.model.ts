import { Model } from 'objection';
import { CourseModel } from 'src/modules/course/entities/course.model';
import { UserAchievementModel } from './user-achievement.model';

export class AchievementModel extends Model {
  static tableName = 'achievements';
  static idColumn = 'id';

  id: number;
  title: string;
  description: string;
  icon_url: string | null;
  course_code: string;
  created_at: Date;
  updated_at: Date;

  course: CourseModel;
  user_achievements: UserAchievementModel[];

  static get relationMappings() {
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseModel,
        join: {
          from: 'achievements.course_code',
          to: 'courses.code',
        },
      },
      user_achievements: {
        relation: Model.HasManyRelation,
        modelClass: UserAchievementModel,
        join: {
          from: 'achievements.id',
          to: 'user_achievements.achievement_id',
        },
      },
    };
  }
}