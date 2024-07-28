import { Model } from 'objection';

export class PeriodModel extends Model {
  static tableName = 'periods';

  id: number;
  name: string;
}
