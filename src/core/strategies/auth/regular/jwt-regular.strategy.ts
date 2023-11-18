import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtRegularStrategy extends PassportStrategy(
  Strategy,
  'regular-jwt',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }
  async validate(payload: any): Promise<any> {
    if (payload['profile_id']) {
      const foundUser = await this.userService.findAndReturnById(payload['id']);
      if (!foundUser) {
        return null;
      }
      return foundUser;
    }
    return null;
  }
}
