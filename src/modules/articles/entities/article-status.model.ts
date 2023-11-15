import { Model } from 'objection';
import { CurrentStatusArticleModel } from './current-status-article.model';
import { HistoryArticleStatusModel } from './history-article-status.model';

export class ArticleStatusModel extends Model {
  static tableName = 'article_statuses';

  id: number;
  status: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      history: {
        relation: Model.HasManyRelation,
        modelClass: HistoryArticleStatusModel,
        join: {
          from: 'article_statuses.id',
          to: 'history_articles_status.status_id',
        },
      },
      current_status: {
        relation: Model.HasManyRelation,
        modelClass: CurrentStatusArticleModel,
        join: {
          from: 'article_statuses.id',
          to: 'current_status_articles.status_id',
        },
      },
    };
  }
}
