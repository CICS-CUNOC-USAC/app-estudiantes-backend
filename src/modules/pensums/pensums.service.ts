import { Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { PensumModel } from './entities/pensum.model';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

@Injectable()
export class PensumsService extends BaseService {
  constructor(
    @Inject(PensumModel.name)
    private pensumModel: ModelClass<PensumModel>,
  ) {
    super(PensumsService.name);
  }

  async findAll() {
    return this.pensumModel.query().select('*');
  }

  async findByCareer(careerCode: number) {
    return this.pensumModel
      .query()
      .where('career_code', careerCode)
      .withGraphFetched('career');
  }

  async findActiveByCareer(careerCode: number) {
    return this.pensumModel
      .query()
      .where('career_code', careerCode)
      .andWhere('active', true)
      .first();
  }

  async findOne(id: number) {
    return this.pensumModel.query().findById(id).withGraphFetched('career');
  }

  async create(data: Partial<PensumModel>) {
    return this.pensumModel.query().insert(data);
  }

  async update(id: number, data: Partial<PensumModel>) {
    return this.pensumModel.query().patchAndFetchById(id, data);
  }

  async remove(id: number) {
    return this.pensumModel.query().deleteById(id);
  }

  queryFilters(
    _queryDto: BaseQueryDto,
    _builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
}
