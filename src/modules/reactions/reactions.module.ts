import { Module } from '@nestjs/common';
import { SanitizationService } from 'src/core/sanitization/sanitization.service';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, SanitizationService],
})
export class ReactionsModule {}
