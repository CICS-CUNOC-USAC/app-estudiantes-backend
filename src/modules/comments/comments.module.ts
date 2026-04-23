import { Module } from '@nestjs/common';
import { SanitizationService } from 'src/core/sanitization/sanitization.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, SanitizationService],
})
export class CommentsModule {}
