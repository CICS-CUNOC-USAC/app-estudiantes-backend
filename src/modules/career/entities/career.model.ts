import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CourseModel } from 'src/modules/course/entities/course.model';

export class CareerModel extends Model {
  static tableName = 'careers';

  code: number;
  name: string;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: CourseModel,
        join: {
          from: 'careers.code',
          through: {
            from: 'career_courses.career_code',
            to: 'career_courses.course_code',
          },
          to: 'courses.code',
        },
      },
    };
  }
}
