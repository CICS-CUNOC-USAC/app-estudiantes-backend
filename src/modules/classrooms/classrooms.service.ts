import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder, Model, ModelClass } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { BaseService } from 'src/core/utils/base-service';
import { ClassroomModel } from './entities/classroom.entity';

@Injectable()
export class ClassroomsService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(ClassroomModel.name)
    private classroomModel: ModelClass<ClassroomModel>,
  ) {
    super(ClassroomModel.name);
  }

  async findAll() {
    return await this.classroomModel.query();
  }

  async findOne(id: number) {
    return await this.classroomModel.query().findById(id);
  }
}
