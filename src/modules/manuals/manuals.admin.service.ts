import { Inject, Injectable } from '@nestjs/common';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { ManualModel } from './entities/manual.model';
import { ModelClass } from 'objection';
import { BaseService } from 'src/core/utils/base-service';
import { ManualsQueryDto } from './dto/manuals-query.dto';
import { type PaginationConverted } from 'src/core/utils/types/pagination';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';

@Injectable()
export class ManualsAdminService extends BaseService {
  constructor(
    @Inject(ManualModel.name)
    private readonly manualModel: ModelClass<ManualModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(ManualsAdminService.name);
  }
  async create(createManualDto: CreateManualDto) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      return this.manualModel.query(trx).insert(createManualDto);
    }, this.logger);
  }

  async findAll(queryDto: ManualsQueryDto) {
    const paginationOptions: PaginationConverted =
      this.createPaginationOptions(queryDto);
    const resultsQueryBuilder = this.manualModel
      .query()
      .select('*')
      .orderBy(paginationOptions.orderBy);
    return this.getCompletePaginatedResponse(
      await this.getPaginatedResults(resultsQueryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} manual`;
  }

  update(id: number, updateManualDto: UpdateManualDto) {
    return `This action updates a #${id} manual`;
  }

  remove(id: number) {
    return `This action removes a #${id} manual`;
  }
}
