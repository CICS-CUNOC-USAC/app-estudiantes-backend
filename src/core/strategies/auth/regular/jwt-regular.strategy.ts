import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { RefreshTokensService } from 'src/modules/auth/refresh-tokens/refresh-tokens.service';

@Injectable()
export class JwtRegularStrategy extends PassportStrategy(
  Strategy,
  'regular-jwt',
) {
  constructor(
    private readonly userService: UsersService,
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
    if (payload.type !== 'user') return null;

    // Verify the session linked to this access token has not been revoked
    const session = await this.refreshTokensService.findActiveByJti(payload.jti);
    if (!session) return null;

    const foundUser = await this.userService.findAndReturnById(payload.sub);
    if (!foundUser) return null;
    return foundUser;
  }
}
