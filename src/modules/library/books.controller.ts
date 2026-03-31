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
import { BookType, LibraryService } from './library.service';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { ApiTags } from '@nestjs/swagger';
import { BooksQueryDto } from './dto/books-query.dto';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';
import { PermissionsGuard } from 'src/core/guards/permissions/permissions.guard';
import { CheckAbilities } from 'src/core/decorators/abilities/abilities.decorator';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { CreateDigitalBookDto } from './dto/create-digital-book.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';

@ApiTags('Library/Books')
@Controller('books')
export class BooksController {
  constructor(private readonly libraryService: LibraryService) {}

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Book' })
  @Post('digital')
  createDigital(
    @Body(new ValidationPipe({ transform: true }))
    createDigitalBookDto: CreateDigitalBookDto,
  ) {
    return this.libraryService.createDigital(createDigitalBookDto);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Book' })
  @Post('physical')
  createPhysical(
    @Body(new ValidationPipe({ transform: true }))
    createPhysicalBookDto: CreatePhysicalBookDto,
  ) {
    return this.libraryService.createPhysical(createPhysicalBookDto);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Book' })
  @Get('digital')
  findAllDigital(@Query() queryDto: BooksQueryDto) {
    return this.libraryService.findAll(queryDto, 'digital');
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Book' })
  @Get('physical')
  findAllPhysical(@Query() queryDto: BooksQueryDto) {
    return this.libraryService.findAll(queryDto, 'physical');
  }

  @UseGuards(JwtGeneralRequiredAuthGuard)
  @Get('public/digital')
  findAllDigitalPublic(@Query() queryDto: BooksQueryDto) {
    return this.libraryService.findAll(queryDto, 'digital');
  }

  @UseGuards(JwtGeneralRequiredAuthGuard)
  @Get('public/physical')
  findAllPhysicalPublic(@Query() queryDto: BooksQueryDto) {
    return this.libraryService.findAll(queryDto, 'physical');
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Book' })
  @Get('admin/:id/:type')
  findOneAdmin(
    @Param('id') id: string,
    @Param('type') type: 'digital' | 'physical',
  ) {
    return this.libraryService.findOne(+id);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Book' })
  @Patch('admin/:id')
  updateAdmin(
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateLibraryDto: UpdateLibraryDto,
  ) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'LibraryReference' })
  @Patch('admin/:bookId/:id')
  updateAdminReference(
    @Param('bookId') bookId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateReferenceDto: UpdateReferenceDto,
  ) {
    return this.libraryService.updateReference(+bookId, id, updateReferenceDto);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'LibraryReference' })
  @Post('admin/:bookId/:id')
  createLibraryReference(
    @Param('bookId') bookId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateReferenceDto: UpdateReferenceDto,
  ) {
    return this.libraryService.createReference(+bookId, id, updateReferenceDto);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'LibraryReference' })
  @Delete('admin/:bookId/:id')
  deleteReference(@Param('bookId') bookId: string, @Param('id') id: string) {
    return this.libraryService.deleteReference(+bookId, id);
  }

  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Book' })
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }

  @UseGuards(JwtGeneralRequiredAuthGuard)
  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.libraryService.findOnePublic(+id);
  }
}
