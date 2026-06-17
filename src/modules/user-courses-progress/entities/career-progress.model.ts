import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { SemesterProgressModel } from './semester-progress.model';
import { PensumModel } from 'src/modules/pensums/entities/pensum.model';

export class CareerProgressModel extends Model {
  static tableName = 'career_progress';

  // Attributes
  id: number;
  user_id: number;
  career_code: number;
  pensum_id: number;

  // Relations
  semester_progress: SemesterProgressModel[] | null;
  pensum: PensumModel | null;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      semester_progress: {
        relation: Model.HasManyRelation,
        modelClass: SemesterProgressModel,
        join: {
          from: 'career_progress.id',
          to: 'semester_progress.career_progress_id',
        },
      },
      pensum: {
        relation: Model.BelongsToOneRelation,
        modelClass: PensumModel,
        join: {
          from: 'career_progress.pensum_id',
          to: 'pensums.id',
        },
      },
    };
  }
}
