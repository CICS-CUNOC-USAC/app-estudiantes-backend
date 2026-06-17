import { Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { groupBy } from 'lodash';
import { PensumCourseModel } from './entities/pensum_course.entity';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { PensumModel } from '../pensums/entities/pensum.model';

@Injectable()
export class PensumCoursesService extends BaseService {
  constructor(
    @Inject(PensumCourseModel.name)
    private pensumCourseModel: ModelClass<PensumCourseModel>,
    @Inject(PensumModel.name)
    private pensumModel: ModelClass<PensumModel>,
  ) {
    super(PensumCoursesService.name);
  }

  async findTotalCreditsByPensum(pensumId: number) {
    const pensum = await this.pensumModel
      .query()
      .findById(pensumId)
      .withGraphFetched('career');

    const onlyMandatoryCreds = await this.pensumCourseModel
      .query()
      .sum('courses.credits as total_credits')
      .join('courses', 'pensum_courses.course_code', 'courses.code')
      .where('pensum_courses.pensum_id', pensumId)
      .andWhere('pensum_courses.mandatory', true)
      .first();

    const onlyNotMandatoryCreds = await this.pensumCourseModel
      .query()
      .sum('courses.credits as total_credits')
      .join('courses', 'pensum_courses.course_code', 'courses.code')
      .where('pensum_courses.pensum_id', pensumId)
      .andWhere('pensum_courses.mandatory', false)
      .first();

    const totalCredits = await this.pensumCourseModel
      .query()
      .sum('courses.credits as total_credits')
      .join('courses', 'pensum_courses.course_code', 'courses.code')
      .where('pensum_courses.pensum_id', pensumId)
      .first();

    return {
      career_name: pensum.career?.name,
      career_code: pensum.career_code,
      pensum_id: pensum.id,
      pensum_year: pensum.year,
      total_credits: +(totalCredits?.['total_credits'] ?? 0),
      mandatory_credits: +(onlyMandatoryCreds?.['total_credits'] ?? 0),
      not_mandatory_credits: +(onlyNotMandatoryCreds?.['total_credits'] ?? 0),
    };
  }

  findAll() {
    return this.pensumCourseModel.query().select('*');
  }

  async findCoursesByPensum(pensumId: number) {
    const courses = await this.pensumCourseModel
      .query()
      .joinRaw(
        'JOIN pensums ON pensum_courses.pensum_id = pensums.id',
      )
      .joinRaw(
        'JOIN career_fields ON (pensums.career_code = career_fields.career_code AND pensum_courses.field = career_fields.field_number)',
      )
      .select('pensum_courses.*', 'career_fields.name as field_name')
      .orderBy('semester')
      .where('pensum_courses.pensum_id', pensumId)
      .withGraphFetched('course')
      .modifyGraph('course', (builder) => {
        builder.select('name', 'credits');
      });

    return courses;
  }

  async findCoursesByPensumAndSemester(pensumId: number) {
    const pensum = await this.pensumModel
      .query()
      .findById(pensumId)
      .withGraphFetched('career');

    if (!pensum) {
      return undefined;
    }

    const courses = await this.pensumCourseModel
      .query()
      .joinRaw(
        'JOIN pensums ON pensum_courses.pensum_id = pensums.id',
      )
      .joinRaw(
        'JOIN career_fields ON (pensums.career_code = career_fields.career_code AND pensum_courses.field = career_fields.field_number)',
      )
      .select('pensum_courses.*', 'career_fields.name as field_name')
      .orderBy('semester')
      .where('pensum_courses.pensum_id', pensumId)
      .withGraphFetched('course')
      .modifyGraph('course', (builder) => {
        builder.select('name', 'credits');
      });

    const groupedCourses = groupBy(courses, 'semester');
    const result = Object.keys(groupedCourses).map((key) => {
      return {
        semester: key,
        courses: groupedCourses[key],
      };
    });

    return {
      career_name: pensum.career?.name,
      career_code: pensum.career_code,
      pensum_id: pensum.id,
      pensum_year: pensum.year,
      courses: result,
    };
  }

  async getPensumSemesters(pensumId: number) {
    return await this.pensumCourseModel
      .query()
      .distinct('semester')
      .where('pensum_id', pensumId)
      .orderBy('semester');
  }

  queryFilters(
    _queryDto: BaseQueryDto,
    _builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
}
