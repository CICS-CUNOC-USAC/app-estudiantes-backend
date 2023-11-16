import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';
import { Request } from 'express';
import { StaffModel } from '../staffs/entities/staff.model';
import { Roles } from 'src/core/decorators/articles/roles.decorator';
import { ArticleRolesGuard } from 'src/core/guards/articles/article-roles.guard';

@ApiTags('articles')
@UseGuards(StaffLoginJwtAuthGuard, ArticleRolesGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('/admin')
  @Roles(['superadmin', 'writer'])
  create(@Body() createArticleDto: CreateArticleDto, @Req() req: Request) {
    return this.articlesService.create(
      createArticleDto,
      req.user as StaffModel,
    );
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
