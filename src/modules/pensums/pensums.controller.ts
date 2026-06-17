import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PensumsService } from './pensums.service';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pensums')
@Controller('pensums')
export class PensumsController {
  constructor(private readonly pensumsService: PensumsService) {}

  @Post()
  create(@Body() createPensumDto: CreatePensumDto) {
    return this.pensumsService.create(createPensumDto);
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
  update(@Param('id') id: string, @Body() updatePensumDto: UpdatePensumDto) {
    return this.pensumsService.update(+id, updatePensumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pensumsService.remove(+id);
  }
}
