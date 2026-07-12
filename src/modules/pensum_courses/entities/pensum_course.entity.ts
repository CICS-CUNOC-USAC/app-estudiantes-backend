import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { ApiProperty } from '@nestjs/swagger';
import { PensumModel } from 'src/modules/pensums/entities/pensum.model';

export class PensumCourseModel extends Model {
  static tableName = 'pensum_courses';

  @ApiProperty({ example: 1, description: 'ID of the pensum' })
  pensum_id: number;

  @ApiProperty({ example: '2804', description: 'Code of the course' })
  course_code: string;

  @ApiProperty({
    example: 2,
    description: 'Semester of the course in the pensum',
  })
  semester: number;

  @ApiProperty({
    example: 1,
    description: 'Field of the course in the pensum',
  })
  field: number;

  @ApiProperty({
    example: true,
    description: 'Mandatory nature of the course in the pensum',
  })
  mandatory: boolean;

  @ApiProperty({
    example: 'Introduccion a la Programacion y Computacion 1',
    description: 'Name of the course',
  })
  name: string;

  @ApiProperty({
    example: '',
    description: 'Description of the course',
  })
  description: string;

  @ApiProperty({
    example: 3,
    description: 'Credits given by the course',
  })
  credits: number;

  @ApiProperty({
    description: 'Pensum details',
    type: () => PensumModel,
  })
  pensum?: PensumModel;

  static get idColumn() {
    return ['pensum_id', 'course_code'];
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      pensum: {
        relation: Model.BelongsToOneRelation,
        modelClass: PensumModel,
        join: {
          from: 'pensum_courses.pensum_id',
          to: 'pensums.id',
        },
      },
    };
  }
}
