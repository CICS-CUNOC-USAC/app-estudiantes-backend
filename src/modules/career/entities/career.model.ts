import { Model } from 'objection';

export class CareerModel extends Model {
  static tableName = 'careers';

  code: number;
  name: string;
}
