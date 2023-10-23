import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { CourseSemesterProgressModel } from './course-semester-progress.model';
import { CareerProgressModel } from './career-progress.model';

export class SemesterProgressModel extends Model {
  static tableName = 'semester_progress';

  // Attributes
  id: number;
  career_progress_id: number;
  semester: number;

  // Relations
  courses_semester_progress: CourseSemesterProgressModel[] | null;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      career_progress: {
        relation: Model.BelongsToOneRelation,
        modelClass: CareerProgressModel,
        join: {
          from: 'semester_progress.career_progress_id',
          to: 'career_progress.id',
        },
      },
      courses_semester_progress: {
        relation: Model.HasManyRelation,
        modelClass: CourseSemesterProgressModel,
        join: {
          from: 'semester_progress.id',
          to: 'courses_semester_progress.semester_progress_id',
        },
      },
    };
  }
}
