import { Inject, Injectable } from '@nestjs/common';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';
import { BaseService } from 'src/core/utils/base-service';
import { QueryBuilder, Model, ModelClass, raw } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { HourModel } from './entities/hour.entity';

@Injectable()
export class HoursService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(HourModel.name)
    private hourModel: ModelClass<HourModel>,
  ) {
    super(HoursService.name);
  }

  create(createHourDto: CreateHourDto) {
    return 'This action adds a new hour';
  }

  async findAll() {
    return await this.hourModel
      .query()
      .select(
        'id',
        raw("TO_CHAR(start_time, 'HH24:MI')").as('start_time'),
        raw("TO_CHAR(end_time, 'HH24:MI')").as('end_time'),
      );
  }

  async findOne(id: number) {
    return await this.hourModel.query().findById(id);
  }

  update(id: number, updateHourDto: UpdateHourDto) {
    return `This action updates a #${id} hour`;
  }

  remove(id: number) {
    return `This action removes a #${id} hour`;
  }
}
