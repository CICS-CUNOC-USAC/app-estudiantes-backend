import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { StaffsService } from 'src/modules/staffs/staffs.service';
import { RefreshTokensService } from 'src/modules/auth/refresh-tokens/refresh-tokens.service';

@Injectable()
export class JwtRequiredStrategy extends PassportStrategy(
  Strategy,
  'general-jwt',
) {
  constructor(
    private readonly userService: UsersService,
    private readonly staffService: StaffsService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: {
    sub: number;
    type: string;
    jti: string;
  }): Promise<any> {
    // Verify the session linked to this access token has not been revoked
    const session = await this.refreshTokensService.findActiveByJti(payload.jti);
    if (!session) return null;

    if (payload.type === 'user') {
      const user = await this.userService.findAndReturnById(payload.sub);
      return { ...user, type: 'profile' };
    } else if (payload.type === 'staff') {
      const staff = await this.staffService.findAndReturnById(payload.sub);
      return { ...staff, type: 'staff' };
    }
    return null;
  }
}
