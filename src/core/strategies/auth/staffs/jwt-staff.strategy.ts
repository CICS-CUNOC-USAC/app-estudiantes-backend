import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StaffsService } from 'src/modules/staffs/staffs.service';
import { RefreshTokensService } from 'src/modules/auth/refresh-tokens/refresh-tokens.service';

@Injectable()
export class JwtStaffStrategy extends PassportStrategy(Strategy, 'staff-jwt') {
  constructor(
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
    if (payload.type !== 'staff') return null;

    // Verify the session linked to this access token has not been revoked
    const session = await this.refreshTokensService.findActiveByJti(payload.jti);
    if (!session) return null;

    const staff = await this.staffService.findAndReturnById(payload.sub);
    if (!staff) return null;
    return staff;
  }
}
