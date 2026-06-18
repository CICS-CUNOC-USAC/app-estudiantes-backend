import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CareerFieldsService } from './career-fields.service';
import { CreateCareerFieldDto } from './dto/create-career-field.dto';
import { UpdateCareerFieldDto } from './dto/update-career-field.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/core/guards/permissions/permissions.guard';
import { CheckAbilities } from 'src/core/decorators/abilities/abilities.decorator';

@ApiTags('Career Fields')
@Controller('pensums/:pensumId/fields')
export class CareerFieldsController {
  constructor(private readonly careerFieldsService: CareerFieldsService) {}

  @Get()
  findByPensum(@Param('pensumId') pensumId: string) {
    return this.careerFieldsService.findByPensum(+pensumId);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  create(
    @Param('pensumId') pensumId: string,
    @Body(new ValidationPipe({ transform: true }))
    dto: CreateCareerFieldDto,
  ) {
    return this.careerFieldsService.create(+pensumId, dto);
  }

  @Patch(':fieldNumber')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  update(
    @Param('pensumId') pensumId: string,
    @Param('fieldNumber') fieldNumber: string,
    @Body(new ValidationPipe({ transform: true }))
    dto: UpdateCareerFieldDto,
  ) {
    return this.careerFieldsService.update(+pensumId, +fieldNumber, dto);
  }

  @Delete(':fieldNumber')
  @UseGuards(PermissionsGuard)
  @CheckAbilities({ action: 'manage', subject: 'Pensum' })
  remove(
    @Param('pensumId') pensumId: string,
    @Param('fieldNumber') fieldNumber: string,
  ) {
    return this.careerFieldsService.remove(+pensumId, +fieldNumber);
  }
}
