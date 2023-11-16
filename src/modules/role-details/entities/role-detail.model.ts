import { Model } from 'objection';
import { RoleModel } from 'src/modules/roles/entities/role.model';
import { StaffModel } from 'src/modules/staffs/entities/staff.model';

export class RoleDetailModel extends Model {
  static tableName = 'role_details';

  id: number;
  role_id: number;
  staff_id: number;
  created_at: Date;
  updated_at: Date;

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: RoleModel,
        join: {
          from: 'role_details.role_id',
          to: 'roles.id',
        },
      },
      staff: {
        relation: Model.BelongsToOneRelation,
        modelClass: StaffModel,
        join: {
          from: 'role_details.staff_id',
          to: 'staffs.id',
        },
      },
    };
  }
}
