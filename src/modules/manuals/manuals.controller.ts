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
import { ManualsService } from './manuals.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { ManualsAdminService } from './manuals.admin.service';
import { ApiTags } from '@nestjs/swagger';
import { ManualsQueryDto } from './dto/manuals-query.dto';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';

@ApiTags('Manuals')
@Controller('manuals')
export class ManualsController {
  constructor(
    private readonly manualsAdminService: ManualsAdminService,
    private readonly manualsService: ManualsService,
  ) {}

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('admin')
  createAdmin(
    @Body(new ValidationPipe({ transform: true }))
    createManualDto: CreateManualDto,
  ) {
    return this.manualsAdminService.create(createManualDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('admin')
  findAllAdmin(@Query() queryDto: ManualsQueryDto) {
    return this.manualsAdminService.findAll(queryDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.manualsAdminService.findOne(+id);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Patch('admin/:id')
  updateAdmin(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateManualDto: UpdateManualDto,
  ) {
    return this.manualsAdminService.update(+id, updateManualDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.manualsAdminService.remove(+id);
  }

  @Get()
  findAll(@Query() queryDto: ManualsQueryDto) {
    return this.manualsService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manualsService.findOne(+id);
  }
}
