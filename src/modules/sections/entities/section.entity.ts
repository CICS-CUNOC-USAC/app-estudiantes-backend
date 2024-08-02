import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

export class SectionModel extends Model {
  static tableName = 'sections';

  @ApiProperty({ example: 1, description: 'ID of the section' })
  id: number;

  @ApiProperty({ example: 'A', description: 'Name of the section' })
  name: string;
}
