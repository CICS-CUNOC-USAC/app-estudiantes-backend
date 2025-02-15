import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

export class HourModel extends Model {
  static tableName = 'hours';

  @ApiProperty({ example: 1, description: 'ID of the hour' })
  id: number;

  @ApiProperty({ example: '14:30', description: 'Start Time of the hour' })
  start_time: string;

  @ApiProperty({ example: '15:20', description: 'End Time of the hour' })
  end_time: string;
}
