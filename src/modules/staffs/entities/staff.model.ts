import { Model } from 'objection';

export class StaffModel extends Model {
  static tableName = 'staffs';

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  encrypted_password: string;
}
