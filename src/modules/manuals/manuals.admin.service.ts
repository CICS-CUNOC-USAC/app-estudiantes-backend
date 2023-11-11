import { Inject, Injectable } from '@nestjs/common';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { ManualModel } from './entities/manual.model';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { BaseService } from 'src/core/utils/base-service';
import { ManualsQueryDto } from './dto/manuals-query.dto';
import { type PaginationConverted } from 'src/core/utils/types/pagination';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { MediaService } from '../media/media.service';

@Injectable()
export class ManualsAdminService extends BaseService {
  constructor(
    @Inject(ManualModel.name)
    private readonly manualModel: ModelClass<ManualModel>,
    private readonly mediaService: MediaService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(ManualsAdminService.name);
  }
  async create(createManualDto: CreateManualDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const createdManual = await this.manualModel
        .query(trx)
        .insert(createManualDto);
      return await this.findOne(createdManual.$id(), trx);
    }, this.logger);
  }

  async findAll(queryDto: ManualsQueryDto) {
    const paginationOptions: PaginationConverted =
      this.createPaginationOptions(queryDto);
    const resultsQueryBuilder = this.manualModel
      .query()
      .select('*')
      .where((builder) => this.queryFilters(queryDto, builder))
      .orderBy(paginationOptions.orderBy);
    return this.getCompletePaginatedResponse(
      await this.getPaginatedResults(resultsQueryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: number, trx?: Transaction) {
    const manual = await this.manualModel
      .query(trx)
      .findOne('id', id)
      .withGraphFetched('media');
    return manual;
  }

  async update(id: number, updateManualDto: UpdateManualDto) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const manual = await this.manualModel.query(trx).findOne('id', id);
      if (manual) {
        await manual.$query(trx).patch(updateManualDto);
      }
      return manual;
    }, this.logger);
  }

  async remove(id: number) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      const manual = await this.manualModel.query(trx).findOne('id', id);
      await this.manualModel.query(trx).deleteById(id);
      await this.mediaService.deleteKeyFileByMediaId(
        manual.media_id,
        trx,
        true,
      );
      return {
        message: `Manual with id ${id} and attached media with id ${manual.media_id} deleted successfully`,
        manual,
      };
    }, this.logger);
  }

  queryFilters(
    queryDto: ManualsQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ) {
    if (queryDto.name) {
      builder.andWhere(
        'name',
        'ilike',
        `%${this.normalizeString(queryDto.name)}%`,
      );
    }
    return builder;
  }
}
