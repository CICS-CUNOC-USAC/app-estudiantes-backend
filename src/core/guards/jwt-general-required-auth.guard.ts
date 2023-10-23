import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IGeneralError } from '../interfaces/response/error/general-error.interface';

@Injectable()
export class JwtGeneralRequiredAuthGuard extends AuthGuard('general-jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      const error: IGeneralError = {
        statusCode: 401,
        message: 'Invalid authentication token',
        error: 'Unauthorized',
      };
      throw new UnauthorizedException(error);
    }
    return user;
  }
}
