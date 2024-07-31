import { Model } from 'objection';
import { WeekdayModel } from 'src/modules/weekdays/entities/weekday.entity';

export class PeriodModel extends Model {
  static tableName = 'periods';

  id: number;
  name: string;

  static get relationMappings() {
    return {
      weekday: {
        relation: Model.BelongsToOneRelation,
        modelClass: WeekdayModel,
        join: {
          from: 'periods.weekday_id',
          to: 'weekdays.id',
        },
      },
    };
  }
}
