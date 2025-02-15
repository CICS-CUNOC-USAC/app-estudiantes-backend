import { Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { SectionModel } from './entities/section.entity';

@Injectable()
export class SectionsService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(SectionModel.name)
    private sectionModel: ModelClass<SectionModel>,
  ) {
    super(SectionsService.name);
  }

  async findAll() {
    return await this.sectionModel.query();
  }

  async findOne(id: number) {
    return await this.sectionModel.query().findById(id);
  }
}
