import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { S3Module } from '../s3/s3.module';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [S3Module],
  exports: [MediaService],
})
export class MediaModule {}
