import { Model } from 'objection';

export class MediaModel extends Model {
  static tableName = 'media';

  id: number;
  filename: string;
  size: number;
  type: string;
  path: string;
  key: string;
  dir: string;
  attach_type: string;
  created_at: Date;
  updated_at: Date;

  static get virtualAttributes() {
    return ['url'];
  }

  get url() {
    return `${process.env.AWS_S3_URL}/${this.key}`;
  }
}
