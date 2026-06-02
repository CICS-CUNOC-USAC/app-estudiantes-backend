import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';
import { BooksService } from './books.service';

@ApiTags('Library/Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtGeneralRequiredAuthGuard)
  @Get()
  findAll() {
    return this.booksService.findAllCategories();
  }
}
