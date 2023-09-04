import { Inject, Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CareerModel } from './entities/career.model';
import { ModelClass } from 'objection';

@Injectable()
export class CareerService {
  constructor(
    @Inject(CareerModel.name)
    private careerModel: ModelClass<CareerModel>,
  ) {}
  create(createCareerDto: CreateCareerDto) {
    return 'This action adds a new career';
  }

  findAll() {
    return `This action returns all career`;
  }

  async findOne(careerCode: number) {
    return this.careerModel.query().select().where('code', careerCode);
  }

  update(id: number, updateCareerDto: UpdateCareerDto) {
    return `This action updates a #${id} career`;
  }

  remove(id: number) {
    return `This action removes a #${id} career`;
  }
}
