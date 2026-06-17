import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CareerFieldModel } from '../pensum_courses/entities/career_field.model';
import { PensumCourseModel } from '../pensum_courses/entities/pensum_course.entity';
import { PensumModel } from '../pensums/entities/pensum.model';
import { CreateCareerFieldDto } from './dto/create-career-field.dto';
import { UpdateCareerFieldDto } from './dto/update-career-field.dto';

@Injectable()
export class CareerFieldsService {
  constructor(
    @Inject(CareerFieldModel.name)
    private careerFieldModel: ModelClass<CareerFieldModel>,
    @Inject(PensumModel.name)
    private pensumModel: ModelClass<PensumModel>,
    @Inject(PensumCourseModel.name)
    private pensumCourseModel: ModelClass<PensumCourseModel>,
  ) {}

  async findByPensum(pensumId: number) {
    return this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .orderBy('field_number');
  }

  async create(pensumId: number, dto: CreateCareerFieldDto) {
    const pensum = await this.pensumModel.query().findById(pensumId);
    if (!pensum) {
      throw new NotFoundException(`Pensum ${pensumId} not found`);
    }

    const existing = await this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', dto.fieldNumber)
      .first();
    if (existing) {
      throw new BadRequestException(
        `Field ${dto.fieldNumber} already exists for pensum ${pensumId}`,
      );
    }

    await this.careerFieldModel.query().insert({
      pensum_id: pensumId,
      field_number: dto.fieldNumber,
      name: dto.name,
      common_field: dto.commonField ?? false,
    } as any);

    return this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', dto.fieldNumber)
      .first();
  }

  async update(pensumId: number, fieldNumber: number, dto: UpdateCareerFieldDto) {
    const entry = await this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', fieldNumber)
      .first();
    if (!entry) {
      throw new NotFoundException(
        `Field ${fieldNumber} not found for pensum ${pensumId}`,
      );
    }

    const patchData: any = {};
    if (dto.name !== undefined) patchData.name = dto.name;
    if (dto.commonField !== undefined) patchData.common_field = dto.commonField;

    await this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', fieldNumber)
      .patch(patchData);

    return this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', fieldNumber)
      .first();
  }

  async remove(pensumId: number, fieldNumber: number) {
    const entry = await this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', fieldNumber)
      .first();
    if (!entry) {
      throw new NotFoundException(
        `Field ${fieldNumber} not found for pensum ${pensumId}`,
      );
    }

    const coursesUsingField = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field', fieldNumber)
      .count('* as count')
      .first();
    if (Number(coursesUsingField?.['count']) > 0) {
      throw new BadRequestException(
        `Cannot delete field ${fieldNumber}: ${coursesUsingField['count']} course(s) still reference it`,
      );
    }

    return this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', fieldNumber)
      .delete();
  }
}
