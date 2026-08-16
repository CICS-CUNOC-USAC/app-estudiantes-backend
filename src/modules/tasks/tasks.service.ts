import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RefreshTokensService } from '../auth/refresh-tokens/refresh-tokens.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly refreshTokensService: RefreshTokensService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async cleanupExpiredTokens(): Promise<number> {
    const deleted = await this.refreshTokensService.cleanup();
    this.logger.log(`Refresh tokens cleanup: ${deleted} registros eliminados`);
    return deleted;
  }
}
