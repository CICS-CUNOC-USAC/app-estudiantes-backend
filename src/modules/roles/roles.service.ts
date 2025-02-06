/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleModel } from './entities/role.model';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { PermissionModel } from '../permissions/entities/permission.model';

@Injectable()
export class RolesService extends BaseService {
  constructor(
    @Inject(RoleModel.name) private readonly roleModel: ModelClass<RoleModel>,
    @Inject(PermissionModel.name) private readonly permissionModel: ModelClass<PermissionModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(RolesService.name)
  }

  async create(createRoleDto: CreateRoleDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const createdRole = await this.roleModel
        .query(trx)
        .insert({name: createRoleDto.name, description: createRoleDto.description, alias: createRoleDto.alias});

        if (createRoleDto.permissions_ids.length > 0) {
            const validPermissions = await Promise.all(
              createRoleDto.permissions_ids.map(async (permissionId) => {
                const permissionExists = await this.permissionModel
                .query(trx)
                .findById(permissionId);

                if (!permissionExists) {
                  throw new Error(`El permiso ${permissionId} no existe`);
                }
                return {
                    role_id: createdRole.id,
                    permission_id: permissionId,
                }
              })
            )

            await trx('role_permissions').insert(validPermissions);
          }
      return await this.findOne(createdRole.$id(), trx);
    }, this.logger);
  }

  async findAll() {
    return await this.roleModel
      .query()
      .select('*')
      .withGraphFetched('permissions');
  }

  async findOne(id: number, trx?: Transaction) {
    return await this.roleModel
      .query(trx)
      .findById(id)
      .withGraphFetched('permissions');
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ) {
    return null;
  }
}
