import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { PermissionModel } from './entities/permission.model';

@Injectable()
export class PermissionsService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(PermissionModel.name)
    private permissionModel: ModelClass<PermissionModel>,
  ) {
    super(PermissionsService.name);
  }
  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission';
  }

  findAll() {
    return this.permissionModel.query().select();
  }

  findOne(id: number) {
    return this.permissionModel.query().findById(id);
  }

  findAllByRoleId(roleId: number) {
    return this.permissionModel
      .query()
      .select()
      .joinRelated('roles')
      .where('roles.id', roleId);
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
