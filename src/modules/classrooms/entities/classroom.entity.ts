import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

export class ClassroomModel extends Model {
  static tableName = 'classrooms';

  @ApiProperty({ example: 1, description: 'ID of the classroom' })
  id: number;

  @ApiProperty({
    example: 'Laboratorio de Aguas',
    description: 'Name of the classroom',
  })
  name: string;
}
