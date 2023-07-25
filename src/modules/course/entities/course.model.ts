import { Model } from 'objection';

export class CourseModel extends Model {
  static tableName = 'courses';

  code: number;
  name: string;
  description: string;
  credits: number;
}
