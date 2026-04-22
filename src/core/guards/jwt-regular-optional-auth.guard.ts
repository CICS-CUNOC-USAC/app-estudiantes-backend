import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalRegularLoginJwtAuthGuard extends AuthGuard('regular-jwt') {
  handleRequest(err, user) {
    if (err) {
      return undefined;
    }

    return user;
  }
}
