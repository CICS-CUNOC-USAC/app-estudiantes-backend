import { Model } from 'objection';
import { RoleModel } from 'src/modules/roles/entities/role.model';

export class PermissionModel extends Model {
  static tableName = 'permissions';

  id: number;
  name: string;
  description: string;
  action: string;
  subject: string;
  conditions: string;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      staffs: {
        relation: Model.ManyToManyRelation,
        modelClass: RoleModel,
        join: {
          from: 'permissions.id',
          through: {
            from: 'role_permissions.permission_id',
            to: 'role_permissions.role_id',
          },
          to: 'roles.id',
        },
      },
    };
  }
}
