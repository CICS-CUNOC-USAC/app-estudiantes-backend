import { Model } from 'objection';

export class CourseModel extends Model {
  static tableName = 'courses';

  code: string;
  name: string;
  description: string;
  credits: number;
}
