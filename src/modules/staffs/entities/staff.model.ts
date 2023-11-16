import { Model } from 'objection';
import { RoleModel } from 'src/modules/roles/entities/role.model';

export class StaffModel extends Model {
  static tableName = 'staffs';

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  encrypted_password: string;
  created_at: Date;
  updated_at: Date;

  roles: RoleModel[];

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: RoleModel,
        join: {
          from: 'staffs.id',
          through: {
            from: 'role_details.staff_id',
            to: 'role_details.role_id',
          },
          to: 'roles.id',
        },
      },
    };
  }
}
