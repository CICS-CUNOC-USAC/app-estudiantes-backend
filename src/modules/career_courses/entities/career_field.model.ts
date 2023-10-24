import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerCourseModel } from './career_course.entity';
import { CareerModel } from 'src/modules/career/entities/career.model';

export class CareerFieldModel extends Model {
  static tableName = 'career_field';

  career_code: number;
  field_number: number;
  name: string;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      career: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerModel,
        join: {
          from: 'career_field.career_code',
          to: 'careers.code',
        },
      },
      career_course: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerCourseModel,
        join: {
          from: 'career_field.field_number',
          to: 'career_courses.field_number',
        },
      },
    };
  }
}
