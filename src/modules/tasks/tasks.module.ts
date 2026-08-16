import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { RefreshTokensModule } from '../auth/refresh-tokens/refresh-tokens.module';

@Module({
  imports: [RefreshTokensModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
