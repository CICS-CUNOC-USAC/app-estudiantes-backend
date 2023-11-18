import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { ApiTags } from '@nestjs/swagger';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';
import { LibraryAdminService } from './library.admin.service';
import { BooksQueryDto } from './dto/books-query.dto';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';

@ApiTags('Library/Books')
@Controller('library')
export class LibraryController {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly libraryAdminService: LibraryAdminService,
  ) {}

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('admin')
  createAdmin(
    @Body(new ValidationPipe({ transform: true }))
    createLibraryDto: CreateLibraryDto,
  ) {
    return this.libraryAdminService.create(createLibraryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('admin')
  findAllAdmin(@Query() queryDto: BooksQueryDto) {
    return this.libraryAdminService.findAll(queryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.libraryAdminService.findOne(+id);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Patch('admin/:id')
  updateAdmin(
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateLibraryDto: UpdateLibraryDto,
  ) {
    return this.libraryAdminService.update(+id, updateLibraryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.libraryAdminService.remove(+id);
  }

  @UseGuards(JwtGeneralRequiredAuthGuard)
  @Get()
  findAllPublic(@Query() queryDto: BooksQueryDto) {
    return this.libraryService.findAll(queryDto);
  }

  @UseGuards(JwtGeneralRequiredAuthGuard)
  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.libraryService.findOne(+id);
  }
}
