import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

export class WeekdayModel extends Model {
  static tableName = 'weekdays';

  @ApiProperty({ example: 1, description: 'ID of the weekday' })
  id: number;

  @ApiProperty({ example: 'Lunes', description: 'Name of the weekday' })
  name: string;
}
