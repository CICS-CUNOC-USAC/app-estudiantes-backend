import { Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { PensumCourseModel } from '../pensum_courses/entities/pensum_course.entity';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

@Injectable()
export class CourseService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }

  async findOneWithPensum(code: string, pensumId: number) {
    return await this.pensumCourseModel
      .query()
      .select('pensum_courses.*', 'career_fields.name as field_name')
      .findOne({
        'pensum_courses.course_code': code,
        'pensum_courses.pensum_id': pensumId,
      })
      .joinRaw(
        'JOIN pensums ON pensum_courses.pensum_id = pensums.id',
      )
      .joinRaw(
        'JOIN career_fields ON (pensum_courses.pensum_id = career_fields.pensum_id AND pensum_courses.field = career_fields.field_number)',
      );
  }

  constructor(
    @Inject(PensumCourseModel.name)
    private pensumCourseModel: ModelClass<PensumCourseModel>,
  ) {
    super(CourseService.name);
  }

  async findAllByPensumAndSemester(semesterNumber: number, pensumId: number) {
    return await this.pensumCourseModel
      .query()
      .select('pensum_courses.*', 'name as course_name', 'credits')
      .where('pensum_id', pensumId)
      .where('semester', semesterNumber);
  }

  async findOne(code: string) {
    return await this.pensumCourseModel
      .query()
      .joinRaw(
        'JOIN pensums ON pensum_courses.pensum_id = pensums.id',
      )
      .joinRaw(
        'JOIN career_fields ON (pensum_courses.pensum_id = career_fields.pensum_id AND pensum_courses.field = career_fields.field_number)',
      )
      .select('pensum_courses.*', 'career_fields.name as field_name')
      .findOne('course_code', code);
  }
}
