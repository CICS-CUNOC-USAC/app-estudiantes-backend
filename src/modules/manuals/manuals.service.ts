import { Inject, Injectable } from '@nestjs/common';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { ManualModel } from './entities/manual.model';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { PaginationConverted } from 'src/core/utils/types/pagination';
import { ManualsQueryDto } from './dto/manuals-query.dto';

@Injectable()
export class ManualsService extends BaseService {
  constructor(
    @Inject(ManualModel.name)
    private readonly manualModel: ModelClass<ManualModel>,
  ) {
    super(ManualsService.name);
  }
  create(createManualDto: CreateManualDto) {
    return 'This action adds a new manual';
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

  update(id: number, updateManualDto: UpdateManualDto) {
    return `This action updates a #${id} manual`;
  }

  remove(id: number) {
    return `This action removes a #${id} manual`;
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
