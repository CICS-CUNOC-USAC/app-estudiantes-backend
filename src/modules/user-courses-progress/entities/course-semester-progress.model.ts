import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { SemesterProgressModel } from './semester-progress.model';
import { CourseModel } from 'src/modules/course/entities/course.model';
import { PensumCourseModel } from 'src/modules/pensum_courses/entities/pensum_course.entity';

export class CourseSemesterProgressModel extends Model {
  static tableName = 'courses_semester_progress';

  // Attributes
  id: number;
  semester_progress_id: number;
  course_code: string;
  approved: boolean;

  // Relations
  course: CourseModel | null;
  pensum_course: PensumCourseModel | null;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      semester_progress: {
        relation: Model.BelongsToOneRelation,
        modelClass: SemesterProgressModel,
        join: {
          from: 'courses_semester_progress.semester_progress_id',
          to: 'semester_progress.id',
        },
      },
      course: {
        relation: Model.HasOneRelation,
        modelClass: CourseModel,
        join: {
          from: 'courses_semester_progress.course_code',
          to: 'courses.code',
        },
      },
      pensum_course: {
        relation: Model.HasOneRelation,
        modelClass: PensumCourseModel,
        join: {
          from: 'courses_semester_progress.course_code',
          to: 'pensum_courses.course_code',
        },
      },
    };
  }
}
