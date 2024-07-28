import { Model } from 'objection';

export class SectionModel extends Model {
  static tableName = 'sections';

  id: number;
  name: string;
}
