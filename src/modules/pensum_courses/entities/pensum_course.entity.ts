import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CourseModel } from 'src/modules/course/entities/course.model';
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
    description: 'Pensum details',
    type: () => PensumModel,
  })
  pensum?: PensumModel;

  @ApiProperty({
    description: 'Course details',
    type: () => CourseModel,
  })
  course?: CourseModel;

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
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseModel,
        join: {
          from: 'pensum_courses.course_code',
          to: 'courses.code',
        },
      },
    };
  }
}
