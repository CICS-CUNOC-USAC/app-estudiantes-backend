import { Model } from 'objection';

export class WeekdayModel extends Model {
  static tableName = 'weekdays';

  id: number;
  name: string;
}
