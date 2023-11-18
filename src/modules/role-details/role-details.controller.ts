import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleDetailsService } from './role-details.service';
import { CreateRoleDetailDto } from './dto/create-role-detail.dto';
import { UpdateRoleDetailDto } from './dto/update-role-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role Details (not used/implemented)')
@Controller('role-details')
export class RoleDetailsController {
  constructor(private readonly roleDetailsService: RoleDetailsService) {}

  @Post()
  create(@Body() createRoleDetailDto: CreateRoleDetailDto) {
    return this.roleDetailsService.create(createRoleDetailDto);
  }

  @Get()
  findAll() {
    return this.roleDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDetailDto: UpdateRoleDetailDto,
  ) {
    return this.roleDetailsService.update(+id, updateRoleDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleDetailsService.remove(+id);
  }
}
