import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PensumsService } from './pensums.service';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';
import { ClonePensumDto } from './dto/clone-pensum.dto';
import { ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/core/guards/permissions/permissions.guard';
import { CheckAbilities } from 'src/core/decorators/abilities/abilities.decorator';

@ApiTags('Pensums')
@Controller('pensums')
export class PensumsController {
  constructor(private readonly pensumsService: PensumsService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  create(@Body() createPensumDto: CreatePensumDto) {
    return this.pensumsService.create(createPensumDto);
  }

  @Post('clone')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  clone(
    @Body(new ValidationPipe({ transform: true }))
    clonePensumDto: ClonePensumDto,
  ) {
    return this.pensumsService.clone(clonePensumDto);
  }

  @Get()
  findAll(@Query('career_code') careerCode?: string) {
    if (careerCode) {
      return this.pensumsService.findByCareer(+careerCode);
    }
    return this.pensumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pensumsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  update(@Param('id') id: string, @Body() updatePensumDto: UpdatePensumDto) {
    return this.pensumsService.update(+id, updatePensumDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  remove(@Param('id') id: string) {
    return this.pensumsService.remove(+id);
  }
}
