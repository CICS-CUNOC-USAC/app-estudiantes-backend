import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MediaModule } from '../media/media.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [MediaModule]
})
export class ArticlesModule {}
