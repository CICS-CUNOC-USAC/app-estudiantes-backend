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

  // Course content used to live on a joined `courses` row and was exposed
  // to clients as a nested `course` object; it now lives inline on
  // pensum_courses, but existing frontend clients still read it from
  // `course.name`/`course.credits`, so keep emitting that shape too.
  private withNestedCourse<
    T extends { name: string; description: string; credits: number },
  >(row: T) {
    return {
      ...row,
      course: { name: row.name, description: row.description, credits: row.credits },
    };
  }

  async findOneWithPensum(code: string, pensumId: number) {
    const course = await this.pensumCourseModel
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
    return course && this.withNestedCourse(course);
  }

  constructor(
    @Inject(PensumCourseModel.name)
    private pensumCourseModel: ModelClass<PensumCourseModel>,
  ) {
    super(CourseService.name);
  }

  async findAllByPensumAndSemester(semesterNumber: number, pensumId: number) {
    const courses = await this.pensumCourseModel
      .query()
      .select('pensum_courses.*')
      .where('pensum_id', pensumId)
      .where('semester', semesterNumber);
    return courses.map((c) => ({
      ...c,
      course: { course_name: c.name, credits: c.credits },
    }));
  }

  async findOne(code: string) {
    const course = await this.pensumCourseModel
      .query()
      .joinRaw(
        'JOIN pensums ON pensum_courses.pensum_id = pensums.id',
      )
      .joinRaw(
        'JOIN career_fields ON (pensum_courses.pensum_id = career_fields.pensum_id AND pensum_courses.field = career_fields.field_number)',
      )
      .select('pensum_courses.*', 'career_fields.name as field_name')
      .findOne('course_code', code);
    return course && this.withNestedCourse(course);
  }
}
