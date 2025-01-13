import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';
import { RoleModel } from '../roles/entities/role.model';
import { PermissionsService } from '../permissions/permissions.service';
import { PermissionModel } from '../permissions/entities/permission.model';

type Action = string;
type Subjects = string;

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private permissionsService: PermissionsService) {}

  createFromPermissions(permissions: PermissionModel[]) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    permissions.forEach((permission) => {
      can(
        permission.action,
        permission.subject,
        JSON.parse(permission.conditions || '{}'),
      );
    });

    return build({
      detectSubjectType: (item) =>
        (item as unknown).constructor as InferSubjects<typeof item>,
      conditionsMatcher: (conditions) => {
        return (object) =>
          Object.entries(conditions).every(
            ([key, value]) => object[key] === value,
          );
      },
    });
  }
}
