/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleModel } from './entities/role.model';
import { ModelClass } from 'objection';

@Injectable()
export class RolesService {
  constructor(
    @Inject(RoleModel.name) private readonly roleModel: ModelClass<RoleModel>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    return await this.roleModel
      .query()
      .select('*')
      .withGraphFetched('permissions');
  }

  async findOne(id: number) {
    return await this.roleModel
      .query()
      .findById(id)
      .withGraphFetched('permissions');
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
