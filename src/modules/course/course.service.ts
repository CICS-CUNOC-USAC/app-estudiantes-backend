import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseModel } from './entities/course.model';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { CareerCourseModel } from '../career_courses/entities/career_course.entity';
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
  async findOneWithCareer(code: string, careerCode: number) {
    return await this.careerCourseModel
      .query()
      .select('career_courses.*', 'career_fields.name as field_name')
      .findOne({
        'career_courses.course_code': code, // Specify the table for course_code
        'career_courses.career_code': careerCode, // Specify the table for career_code
      })
      .joinRaw(
        'JOIN career_fields ON (career_courses.career_code = career_fields.career_code AND career_courses.field = career_fields.field_number)',
      )
      .withGraphFetched('course');
  }
  constructor(
    @Inject(CourseModel.name)
    private courseModel: ModelClass<CourseModel>,
    @Inject(CareerCourseModel.name)
    private careerCourseModel: ModelClass<CareerCourseModel>,
  ) {
    super(CourseService.name);
  }
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll() {
    return await this.courseModel.query().select('*');
  }

  async findAllByCareerAndSemester(semesterNumber: number, carrerCode: number) {
    return await this.careerCourseModel
      .query()
      // .select('*')
      .where('career_code', carrerCode)
      .where('semester', semesterNumber)
      .withGraphFetched('course')
      .modifyGraph('course', (builder) => {
        builder.select('name as course_name', 'credits');
      });
  }

  async findOne(code: string) {
    return await this.careerCourseModel
      .query()
      .joinRaw(
        'JOIN career_fields ON (career_courses.career_code = career_fields.career_code AND career_courses.field = career_fields.field_number)',
      )
      .select('career_courses.*', 'career_fields.name as field_name')
      .findOne('course_code', code)
      .withGraphFetched('course');
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
