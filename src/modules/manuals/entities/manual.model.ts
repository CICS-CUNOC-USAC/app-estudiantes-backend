import { Model } from 'objection';

export class ManualModel extends Model {
  static tableName = 'manuals';

  id: number;
  name: string;
  description: string;
  file: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;

  static get relationMappings() {
    // Insert relation mappings here
    return {};
  }
}
