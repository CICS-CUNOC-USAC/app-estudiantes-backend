/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
  CHECK_ABILITY,
  Permission,
} from 'src/core/decorators/abilities/abilities.decorator';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { CaslAbilityFactory } from 'src/modules/casl/casl-ability.factory';
import { StaffModel } from 'src/modules/staffs/entities/staff.model';
import { StaffsService } from 'src/modules/staffs/staffs.service';

@Injectable()
export class PermissionsGuard extends AuthGuard('staff-jwt') {
  constructor(
    private reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private staffService: StaffsService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
      console.log("COSAS")
      console.log(err)
      console.log(user)
      console.log(info)
      console.log(context)
    if (err) {
      const error: IGeneralError = {
        statusCode: 500,
        message:
          err.message,
        error: 'Internal Server Error',
      };
      throw new InternalServerErrorException(error);
    }
    const permissions = this.reflector.getAllAndOverride<Permission[]>(
      CHECK_ABILITY,
      [
      context.getHandler(),
      context.getClass()
      ]
    );

    console.log('ENTRA A ESTE GUARD');
    console.log(permissions);
    if (!permissions) {
      return user;
    }

    console.log('USUARIO')
    console.log(user)
    if (!user) {
      const error: IGeneralError = {
        statusCode: 401,
        message: 'Invalid user',
        error: 'Unauthorized',
      };
      throw new UnauthorizedException(error);
    }

    if (!user.roles.length) {
      const error: IGeneralError = {
        statusCode: 401,
        message: 'Invalid roles',
        error: 'Unauthorized',
      };
      throw new UnauthorizedException(error);
    }

    for (const role of user.roles) {
      const ability = this.caslAbilityFactory.createFromPermissions(role.permissions);

      // Si un solo rol tiene permiso, se otorga el acceso
      const hasPermission = permissions.every((permission) =>
        ability.can(permission.action, permission.subject),
      );
      if (hasPermission) return user;
    }

    // Si ninguno de los roles tiene permiso, denegar acceso
  const error: IGeneralError = {
    statusCode: 401,
    message: 'Not enough permissions',
    error: 'Unauthorized',
  };
  throw new UnauthorizedException(error);
  }
}
