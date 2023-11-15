import { Model } from 'objection';
import { ArticleStatusModel } from './article-status.model';
import { ArticleModel } from './article.model';

export class CurrentStatusArticleModel extends Model {
  static tableName = 'current_status_articles';

  id: number;
  article_id: number;
  status_id: number;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: ArticleStatusModel,
        join: {
          from: 'current_status_articles.status_id',
          to: 'article_statuses.id',
        },
      },
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: ArticleModel,
        join: {
          from: 'current_status_articles.article_id',
          to: 'articles.id',
        },
      },
    };
  }
}
