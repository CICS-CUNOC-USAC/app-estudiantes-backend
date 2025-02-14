import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { HourModel } from 'src/modules/hours/entities/hour.entity';
import { WeekdayModel } from 'src/modules/weekdays/entities/weekday.entity';

export class PeriodModel extends Model {
  static tableName = 'periods';

  @ApiProperty({ example: 2, description: 'ID of the section of the course' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the weekday of the period' })
  weekday_id: string;

  @ApiProperty({ example: 3, description: 'ID of the hour of the period' })
  hour_id: string;

  @ApiProperty({
    description: 'Weekday details',
    type: () => WeekdayModel,
  })
  weekday: WeekdayModel;

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
      hour: {
        relation: Model.BelongsToOneRelation,
        modelClass: HourModel,
        join: {
          from: 'periods.hour_id',
          to: 'hours.id',
        },
      },
    };
  }
}
