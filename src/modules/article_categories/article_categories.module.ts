import { Module } from '@nestjs/common';
import { ArticleCategoriesService } from './article_categories.service';
import { ArticleCategoriesController } from './article_categories.controller';

@Module({
  controllers: [ArticleCategoriesController],
  providers: [ArticleCategoriesService],
})
export class ArticleCategoriesModule {}
