import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';
import { LibraryService } from './library.service';

@ApiTags('Library/Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly libraryService: LibraryService) {}

  @UseGuards(JwtGeneralRequiredAuthGuard)
  @Get()
  findAll() {
    return this.libraryService.findAllCategories();
  }
}
