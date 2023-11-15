import { Model } from 'objection';
import { MediaModel } from 'src/modules/media/entities/media.model';
import { CurrentStatusArticleModel } from './current-status-article.model';
import { StaffModel } from 'src/modules/staffs/entities/staff.model';
import { HistoryArticleStatusModel } from './history-article-status.model';

export class ArticleModel extends Model {
  static tableName = 'articles';

  id: number;
  title: string;
  description: string;
  staff_id: number;
  media_id: number;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      current_status: {
        relation: Model.HasOneRelation,
        modelClass: CurrentStatusArticleModel,
        join: {
          from: 'articles.id',
          to: 'current_status_articles.article_id',
        },
      },
      history_status: {
        relation: Model.HasManyRelation,
        modelClass: HistoryArticleStatusModel,
        join: {
          from: 'articles.id',
          to: 'history_articles_status.article_id',
        },
      },
      staff: {
        relation: Model.BelongsToOneRelation,
        modelClass: StaffModel,
        join: {
          from: 'articles.staff_id',
          to: 'staffs.id',
        },
      },
      media: {
        relation: Model.HasOneRelation,
        modelClass: MediaModel,
        join: {
          from: 'articles.media_id',
          to: 'media.id',
        },
      },
    };
  }
}
