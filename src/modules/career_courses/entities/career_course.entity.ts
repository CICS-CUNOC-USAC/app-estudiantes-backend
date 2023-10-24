import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CareerModel } from 'src/modules/career/entities/career.model';
import { CourseModel } from 'src/modules/course/entities/course.model';
import { CareerFieldModel } from './career_field.model';

export class CareerCourseModel extends Model {
  static tableName = 'career_courses';

  career_code: number;
  course_code: string;
  semester: number;
  field: number;
  mandatory: boolean;

  career: CareerModel | null;
  course: CourseModel | null;

  $formatJson(json) {
    json = super.$formatJson(json);
    if (json.field !== undefined) {
      console.log(json.field);
      switch (json.field) {
        case 1:
          json.field = {
            name: 'Ciencias Básicas',
            number: 1,
          };
          break;
        case 2:
          json.field = {
            name: 'Ingeniería',
            number: 2,
          };
          break;
        case 3:
          json.field = {
            name: 'Ciencias Sociales',
            number: 3,
          };
          break;
        case 4:
          json.field = {
            name: 'Area común',
            number: 4,
          };
          break;
      }
    }

    return json;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      career: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerModel,
        join: {
          from: 'career_courses.career_code',
          to: 'careers.code',
        },
      },
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseModel,
        join: {
          from: 'career_courses.course_code',
          to: 'courses.code',
        },
      },
      career_field: {
        relation: Model.HasOneRelation,
        modelClass: CareerFieldModel,
        join: {
          from: 'career_courses.field_number',
          to: 'career_field.field_number',
        },
      },
    };
  }
}
