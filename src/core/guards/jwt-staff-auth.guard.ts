import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IGeneralError } from '../interfaces/response/error/general-error.interface';

// This class only extends the passport-jwt strategy guard to avoid having
// to write the same code in multiple places and having magic strings.
@Injectable()
export class StaffLoginJwtAuthGuard extends AuthGuard('staff-jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      const error: IGeneralError = {
        statusCode: 401,
        message:
          'Invalid authentication token or not authorized to access this resource',
        error: 'Unauthorized',
      };
      throw new UnauthorizedException(error);
    }
    return user;
  }
}
