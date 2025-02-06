import { Model } from 'objection';
import { PermissionModel } from 'src/modules/permissions/entities/permission.model';
import { StaffModel } from 'src/modules/staffs/entities/staff.model';

export class RoleModel extends Model {
  static tableName = 'roles';

  id: number;
  alias: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      staffs: {
        relation: Model.ManyToManyRelation,
        modelClass: StaffModel,
        join: {
          from: 'roles.id',
          through: {
            from: 'role_details.role_id',
            to: 'role_details.staff_id',
          },
          to: 'staffs.id',
        },
      },
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: PermissionModel,
        join: {
          from: 'roles.id',
          through: {
            from: 'role_permissions.role_id',
            to: 'role_permissions.permission_id',
          },
          to: 'permissions.id',
        },
      },
    };
  }
}
