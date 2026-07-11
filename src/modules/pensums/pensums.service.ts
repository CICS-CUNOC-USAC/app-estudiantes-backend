import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder, transaction } from 'objection';
import { PensumModel } from './entities/pensum.model';
import { PensumCourseModel } from '../pensum_courses/entities/pensum_course.entity';
import { CareerFieldModel } from '../pensum_courses/entities/career_field.model';
import { PensumCoursePrerequisiteModel } from '../pensum_courses/entities/pensum_course_prerequisite.model';
import { CoursePrerequisiteModel } from '../pensum_courses/entities/course_prerequisite.model';
import { CreditsPrerequisiteModel } from '../pensum_courses/entities/credits_prerequisite.model';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { ClonePensumDto } from './dto/clone-pensum.dto';

@Injectable()
export class PensumsService extends BaseService {
  constructor(
    @Inject(PensumModel.name)
    private pensumModel: ModelClass<PensumModel>,
    @Inject(PensumCourseModel.name)
    private pensumCourseModel: ModelClass<PensumCourseModel>,
    @Inject(CareerFieldModel.name)
    private careerFieldModel: ModelClass<CareerFieldModel>,
    @Inject(PensumCoursePrerequisiteModel.name)
    private prerequisiteModel: ModelClass<PensumCoursePrerequisiteModel>,
    @Inject(CoursePrerequisiteModel.name)
    private coursePrerequisiteModel: ModelClass<CoursePrerequisiteModel>,
    @Inject(CreditsPrerequisiteModel.name)
    private creditsPrerequisiteModel: ModelClass<CreditsPrerequisiteModel>,
  ) {
    super(PensumsService.name);
  }

  async findAll() {
    return this.pensumModel.query().select('*').withGraphFetched('career');
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

  async clone(dto: ClonePensumDto) {
    const source = await this.pensumModel.query().findById(dto.sourcePensumId);
    if (!source) {
      throw new NotFoundException(`Source pensum ${dto.sourcePensumId} not found`);
    }

    return transaction(this.pensumModel.knex(), async (trx) => {
      const newPensum = await this.pensumModel.query(trx).insert({
        career_code: source.career_code,
        year: dto.year,
        active: false,
      } as any);

      const fields = await this.careerFieldModel
        .query(trx)
        .where('pensum_id', dto.sourcePensumId);
      if (fields.length > 0) {
        await this.careerFieldModel.query(trx).insert(
          fields.map((f) => ({
            pensum_id: newPensum.id,
            field_number: f.field_number,
            name: f.name,
            common_field: f.common_field,
          } as any)),
        );
      }

      const courses = await this.pensumCourseModel
        .query(trx)
        .where('pensum_id', dto.sourcePensumId);
      if (courses.length > 0) {
        await this.pensumCourseModel.query(trx).insert(
          courses.map((c) => ({
            pensum_id: newPensum.id,
            course_code: c.course_code,
            semester: c.semester,
            field: c.field,
            mandatory: c.mandatory,
            name: c.name,
            description: c.description,
            credits: c.credits,
          } as any)),
        );
      }

      const prerequisites = await this.prerequisiteModel
        .query(trx)
        .where('pensum_id', dto.sourcePensumId)
        .withGraphFetched('[coursePrerequisites, creditsPrerequisites]');
      for (const prereq of prerequisites) {
        const newPrereq = await this.prerequisiteModel.query(trx).insert({
          pensum_id: newPensum.id,
          course_code: prereq.course_code,
          is_course: prereq.is_course,
        } as any);

        if (prereq.coursePrerequisites?.length > 0) {
          await this.coursePrerequisiteModel.query(trx).insert(
            prereq.coursePrerequisites.map((cp) => ({
              pensum_id: newPensum.id,
              course_code: cp.course_code,
              career_course_prerequisite_id: newPrereq.id,
            } as any)),
          );
        }

        if (prereq.creditsPrerequisites?.length > 0) {
          await this.creditsPrerequisiteModel.query(trx).insert(
            prereq.creditsPrerequisites.map((cr) => ({
              credits: cr.credits,
              career_course_prerequisite_id: newPrereq.id,
            } as any)),
          );
        }
      }

      return this.pensumModel.query(trx).findById(newPensum.id).withGraphFetched('career');
    });
  }

  queryFilters(
    _queryDto: BaseQueryDto,
    _builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
}
