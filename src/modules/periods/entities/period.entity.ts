import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { WeekdayModel } from 'src/modules/weekdays/entities/weekday.entity';

export class PeriodModel extends Model {
  static tableName = 'periods';

  @ApiProperty({ example: 2, description: 'ID of the section of the course' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the weekday of the period' })
  weekday_id: string;

  @ApiProperty({ example: '14:30', description: 'Start Time of the period' })
  start_time: string;

  @ApiProperty({ example: '15:20', description: 'End Time of the period' })
  end_time: string;

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
    };
  }
}
