import { Model } from 'objection';
import { ArticleStatusModel } from './article-status.model';
import { ArticleModel } from './article.model';

export class HistoryArticleStatusModel extends Model {
  static tableName = 'history_articles_status';

  id: number;
  message: string;
  date_change: Date;
  article_id: number;
  staff_id: number;
  status_id: number;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: ArticleStatusModel,
        join: {
          from: 'history_articles_status.status_id',
          to: 'article_statuses.id',
        },
      },
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: ArticleModel,
        join: {
          from: 'history_articles_status.article_id',
          to: 'articles.id',
        },
      },
    };
  }
}
