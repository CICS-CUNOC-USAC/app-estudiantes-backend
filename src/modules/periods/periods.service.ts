import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder, Model, ModelClass } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { BaseService } from 'src/core/utils/base-service';
import { PeriodModel } from './entities/period.entity';

@Injectable()
export class PeriodsService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(PeriodModel.name)
    private periodModel: ModelClass<PeriodModel>,
  ) {
    super(PeriodsService.name);
  }

  async findAll() {
    return this.periodModel.query();
  }

  async findOne(id: number) {
    return this.periodModel.query().findById(id);
  }
}
