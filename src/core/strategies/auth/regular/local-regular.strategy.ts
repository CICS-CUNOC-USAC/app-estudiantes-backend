import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from 'src/modules/users/entities/user.model';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { RegularAuthService } from 'src/modules/auth/regular/regular-auth.service';

@Injectable()
export class LocalRegularStrategy extends PassportStrategy(
  Strategy,
  'regular-login',
) {
  constructor(private readonly regularAuthService: RegularAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user: UserModel =
      await this.regularAuthService.validateUserCredentials(email, password);
    if (!user) {
      const error: IGeneralError = {
        statusCode: 401,
        message: 'Invalid user credentials',
        error: 'Unauthorized',
      };
      throw new UnauthorizedException(error);
    }
    return user;
  }
}
