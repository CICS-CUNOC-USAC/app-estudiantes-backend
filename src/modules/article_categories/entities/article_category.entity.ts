import { Model } from 'objection';

export class ArticleCategoryModel extends Model {
  static tableName = 'article_categories';

  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
