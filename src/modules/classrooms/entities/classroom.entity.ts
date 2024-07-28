import { Model } from 'objection';

export class ClassroomModel extends Model {
  static tableName = 'classrooms';

  id: number;
  name: string;
}
