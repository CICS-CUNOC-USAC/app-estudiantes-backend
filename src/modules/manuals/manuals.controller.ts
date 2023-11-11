import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { GeneralAuthInterceptor } from 'src/core/interceptors/auth/regular-auth.interceptor';
import { ManualsAdminService } from './manuals.admin.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';
import { ManualsQueryDto } from './dto/manuals-query.dto';

@ApiTags('Manuals')
@UseInterceptors(GeneralAuthInterceptor)
@UseGuards(JwtGeneralRequiredAuthGuard)
@Controller('manuals')
export class ManualsController {
  constructor(
    private readonly manualsAdminService: ManualsAdminService,
    private readonly manualsService: ManualsService,
  ) {}

  @Post('admin')
  create(
    @Body(new ValidationPipe({ transform: true }))
    createManualDto: CreateManualDto,
  ) {
    return this.manualsAdminService.create(createManualDto);
  }

  @Get('admin')
  findAllAdmin(@Query() queryDto: ManualsQueryDto) {
    return this.manualsAdminService.findAll(queryDto);
  }

  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.manualsAdminService.findOne(+id);
  }

  @Patch('admin/:id')
  updateAdmin(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateManualDto: UpdateManualDto,
  ) {
    return this.manualsAdminService.update(+id, updateManualDto);
  }

  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.manualsAdminService.remove(+id);
  }

  @Get('admin/:id')
  findAll(@Query() queryDto: ManualsQueryDto) {
    return this.manualsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manualsService.findOne(+id);
  }
}
