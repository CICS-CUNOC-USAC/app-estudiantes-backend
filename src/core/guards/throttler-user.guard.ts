import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerUserGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const userId = req.user?.id ?? req.user?.['id'];
    if (userId !== undefined && userId !== null) {
      return `user:${userId}`;
    }

    const forwardedFor = req.headers?.['x-forwarded-for'];
    if (typeof forwardedFor === 'string' && forwardedFor.trim().length > 0) {
      return `ip:${forwardedFor.split(',')[0].trim()}`;
    }

    return `ip:${req.ip ?? 'unknown'}`;
  }
}
