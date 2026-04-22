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

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const foundRole = await this.roleModel.query(trx).findById(id);

      if (!foundRole) {
        throw new Error(`El rol ${id} no existe`);
      }

      await this.roleModel.query(trx).findById(id).patch({
        name: updateRoleDto.name,
        description: updateRoleDto.description,
        alias: updateRoleDto.alias,
      });

      if (updateRoleDto.permissions_ids) {
        await trx('role_permissions').where('role_id', id).delete();

        if (updateRoleDto.permissions_ids.length > 0) {
          const permissionsIds = Array.from(new Set(updateRoleDto.permissions_ids));

          const permissions = await this.permissionModel
            .query(trx)
            .select('id')
            .whereIn('id', permissionsIds);

          if (permissions.length !== permissionsIds.length) {
            throw new Error('Uno o mas permisos no existen');
          }

          await trx('role_permissions').insert(
            permissionsIds.map((permissionId) => ({
              role_id: id,
              permission_id: permissionId,
            })),
          );
        }
      }

      return await this.findOne(id, trx);
    }, this.logger);
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
