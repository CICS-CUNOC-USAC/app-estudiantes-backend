import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';

export interface Response<T> {
  data: T;
}

/*
  Interceptor to be used in endpoints that require authentication.
  Checks if the user is authenticated and if the user is of the correct type (admin or regular user).
  Admins (staffs) are not allowed to use endpoints with this interceptor and vice versa.
*/
@Injectable()
export class GeneralAuthInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const { type } = user;
    const endpoint = request.route.path;
    // If there is no authenticated user present (this should be handled by guards but in case it fails or is missing),
    // throw an unauthenticated exception
    if (!user) {
      this.throwUnauthenticatedException();
    }

    // If the endpoint contains 'admin' in the path, we throw an exception since regular users cannot access admin endpoints
    if (endpoint.includes('admin') && type !== 'staff') {
      this.throwUnauthenticatedException();
    } else if (type === 'staff' && !endpoint.includes('admin')) {
      // If the endpoint does not contain 'admin' in the path, we throw an exception since staff users cannot access regular user endpoints
      this.throwUnauthenticatedException();
    }

    return next.handle().pipe();
  }

  private throwUnauthenticatedException(error?: IGeneralError) {
    const defaultError: IGeneralError = {
      statusCode: 403,
      message: 'You are not authorized to perform this operation',
      error: 'Unauthorized',
    };
    throw new UnauthorizedException(error || defaultError);
  }
}
