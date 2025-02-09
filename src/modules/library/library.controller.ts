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
import { BooksQueryDto } from './dto/books-query.dto';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';

@ApiTags('Library/Books')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('digital')
  createDigital(
    @Body(new ValidationPipe({ transform: true }))
    createLibraryDto: CreateLibraryDto,
  ) {
    return this.libraryService.create(createLibraryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('physical')
  createPhysical(
    @Body(new ValidationPipe({ transform: true }))
    createLibraryDto: CreateLibraryDto,
  ) {
    return this.libraryService.create(createLibraryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('admin')
  findAllAdmin(@Query() queryDto: BooksQueryDto) {
    return this.libraryService.findAll(queryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.libraryService.findOne(+id);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Patch('admin/:id')
  updateAdmin(
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateLibraryDto: UpdateLibraryDto,
  ) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
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
