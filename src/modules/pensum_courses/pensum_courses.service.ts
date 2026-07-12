import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { groupBy } from 'lodash';
import { PensumCourseModel } from './entities/pensum_course.entity';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { PensumModel } from '../pensums/entities/pensum.model';
import { CareerFieldModel } from './entities/career_field.model';
import { AddPensumCourseDto } from './dto/add-pensum-course.dto';
import { UpdatePensumCourseDto } from './dto/update-pensum_course.dto';

@Injectable()
export class PensumCoursesService extends BaseService {
  constructor(
    @Inject(PensumCourseModel.name)
    private pensumCourseModel: ModelClass<PensumCourseModel>,
    @Inject(PensumModel.name)
    private pensumModel: ModelClass<PensumModel>,
    @Inject(CareerFieldModel.name)
    private careerFieldModel: ModelClass<CareerFieldModel>,
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
      .sum('pensum_courses.credits as total_credits')
      .where('pensum_courses.pensum_id', pensumId)
      .andWhere('pensum_courses.mandatory', true)
      .first();

    const onlyNotMandatoryCreds = await this.pensumCourseModel
      .query()
      .sum('pensum_courses.credits as total_credits')
      .where('pensum_courses.pensum_id', pensumId)
      .andWhere('pensum_courses.mandatory', false)
      .first();

    const totalCredits = await this.pensumCourseModel
      .query()
      .sum('pensum_courses.credits as total_credits')
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

  async findCoursesByPensum(pensumId: number) {
    const courses = await this.pensumCourseModel
      .query()
      .joinRaw(
        'JOIN pensums ON pensum_courses.pensum_id = pensums.id',
      )
      .joinRaw(
        'JOIN career_fields ON (pensum_courses.pensum_id = career_fields.pensum_id AND pensum_courses.field = career_fields.field_number)',
      )
      .select('pensum_courses.*', 'career_fields.name as field_name')
      .orderBy('semester')
      .where('pensum_courses.pensum_id', pensumId);

    return courses.map((c) => this.withNestedCourse(c));
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
        'JOIN career_fields ON (pensum_courses.pensum_id = career_fields.pensum_id AND pensum_courses.field = career_fields.field_number)',
      )
      .select('pensum_courses.*', 'career_fields.name as field_name')
      .orderBy('semester')
      .where('pensum_courses.pensum_id', pensumId);

    const groupedCourses = groupBy(courses, 'semester');
    const result = Object.keys(groupedCourses).map((key) => {
      return {
        semester: key,
        courses: groupedCourses[key].map((c) => this.withNestedCourse(c)),
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

  async addCourseToPensum(pensumId: number, dto: AddPensumCourseDto) {
    const pensum = await this.pensumModel.query().findById(pensumId);
    if (!pensum) {
      throw new NotFoundException(`Pensum ${pensumId} not found`);
    }

    const validField = await this.careerFieldModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('field_number', dto.field)
      .first();
    if (!validField) {
      throw new BadRequestException(
        `Field ${dto.field} is not valid for pensum ${pensumId}`,
      );
    }

    const duplicate = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', dto.courseCode)
      .first();
    if (duplicate) {
      throw new BadRequestException(
        `Course ${dto.courseCode} is already in pensum ${pensumId}`,
      );
    }

    await this.pensumCourseModel.query().insert({
      pensum_id: pensumId,
      course_code: dto.courseCode,
      semester: dto.semester,
      field: dto.field,
      mandatory: dto.mandatory,
      name: dto.courseName,
      description: dto.courseDescription,
      credits: dto.courseCredits,
    } as any);

    const inserted = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', dto.courseCode)
      .first();
    return inserted && this.withNestedCourse(inserted);
  }

  async updateCourseInPensum(
    pensumId: number,
    courseCode: string,
    dto: UpdatePensumCourseDto,
  ) {
    const entry = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', courseCode)
      .first();
    if (!entry) {
      throw new NotFoundException(
        `Course ${courseCode} not found in pensum ${pensumId}`,
      );
    }

    const updated = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', courseCode)
      .patch({
        ...(dto.courseName !== undefined && { name: dto.courseName }),
        ...(dto.courseDescription !== undefined && {
          description: dto.courseDescription,
        }),
        ...(dto.courseCredits !== undefined && { credits: dto.courseCredits }),
        ...(dto.semester !== undefined && { semester: dto.semester }),
        ...(dto.field !== undefined && { field: dto.field }),
        ...(dto.mandatory !== undefined && { mandatory: dto.mandatory }),
      } as any)
      .returning('*')
      .first();
    return updated && this.withNestedCourse(updated);
  }

  async removeCourseFromPensum(pensumId: number, courseCode: string) {
    const entry = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', courseCode)
      .first();
    if (!entry) {
      throw new NotFoundException(
        `Course ${courseCode} not found in pensum ${pensumId}`,
      );
    }

    return this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', courseCode)
      .delete();
  }

  queryFilters(
    _queryDto: BaseQueryDto,
    _builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
}
