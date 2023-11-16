import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ModelClass } from 'objection';
import { Roles } from 'src/core/decorators/articles/roles.decorator';
import { RoleModel } from 'src/modules/roles/entities/role.model';

@Injectable()
export class ArticleRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(RoleModel.name)
    private readonly roleModel: ModelClass<RoleModel>,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    // First, find the specified roles from the decorator in the database
    const rolesToCheck = await this.roleModel
      .query()
      .whereIn('alias', roles)
      .select('id');
    if (!rolesToCheck.length) {
      return false;
    }
    // Then, find the user's roles in the database
    const userRoles = await this.roleModel
      .query()
      .findByIds(user.roles.map((role) => role.id))
      .withGraphFetched('staffs');
    // Finally, check if the user has the specified roles
    const hasRole = userRoles.some((role) => {
      return rolesToCheck.some((roleToCheck) => role.id === roleToCheck.id);
    });
    return hasRole;
  }
}
