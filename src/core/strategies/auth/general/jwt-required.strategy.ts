import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { StaffsService } from 'src/modules/staffs/staffs.service';

@Injectable()
export class JwtRequiredStrategy extends PassportStrategy(
  Strategy,
  'general-jwt',
) {
  constructor(
    private readonly userService: UsersService,
    private readonly staffService: StaffsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: object): Promise<any> {
    if (payload['profile_id']) {
      const user = await this.userService.findAndReturnById(+payload['id']);
      return {
        ...user,
        type: 'profile',
      };
    } else {
      const staff = await this.staffService.findAndReturnById(+payload['id']);
      return {
        ...staff,
        type: 'staff',
      };
    }
  }
}
