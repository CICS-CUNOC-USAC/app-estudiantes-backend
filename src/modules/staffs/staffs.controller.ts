import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiTags } from '@nestjs/swagger';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';
import { StaffsQueryDto } from './dto/staff-query.dto';
import { StaffSuperadminLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth-superadmin.guard';
import { UpdateStaffRolesDto } from './dto/update-roles-staff.dto';

@ApiTags('staffs')
@Controller('staffs')
@UseGuards(StaffLoginJwtAuthGuard)
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @UseGuards(StaffSuperadminLoginJwtAuthGuard)
  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    createStaffDto: CreateStaffDto,
  ) {
    return this.staffsService.create(createStaffDto);
  }

  @UseGuards(StaffSuperadminLoginJwtAuthGuard)
  @Get()
  findAll(@Query() queryDto: StaffsQueryDto) {
    return this.staffsService.findAll(queryDto);
  }

  @UseGuards(StaffSuperadminLoginJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffsService.findAndReturnById(+id);
  }

  @UseGuards(StaffSuperadminLoginJwtAuthGuard)
  @Get(':id/roles')
  findOneRoles(@Param('id') id: string) {
    return this.staffsService.findOneRoles(+id);
  }

  @UseGuards(StaffSuperadminLoginJwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateStaffDto: UpdateStaffDto,
  ) {
    console.log('updateStaffDto', updateStaffDto);
    return this.staffsService.update(+id, updateStaffDto);
  }

  @UseGuards(StaffSuperadminLoginJwtAuthGuard)
  @Patch(':id/roles')
  updateRoles(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateStaffRolesDto: UpdateStaffRolesDto,
  ) {
    return this.staffsService.updateRoles(+id, updateStaffRolesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.staffsService.remove(+id);
  }
}
