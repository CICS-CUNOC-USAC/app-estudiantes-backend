import { Module } from '@nestjs/common';
import { ArticlesService } from './ArticlesService';
import { ArticlesController } from './articles.controller';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
