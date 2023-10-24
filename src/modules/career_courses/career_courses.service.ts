import { Inject, Injectable } from '@nestjs/common';
import { CreateCareerCourseDto } from './dto/create-career_course.dto';
import { UpdateCareerCourseDto } from './dto/update-career_course.dto';
import { ModelClass } from 'objection';
import { CareerCourseModel } from './entities/career_course.entity';
import { BaseService } from 'src/core/utils/base-service';
import { CareerModel } from '../career/entities/career.model';

@Injectable()
export class CareerCoursesService extends BaseService {
  constructor(
    @Inject(CareerCourseModel.name)
    private careerCourseModel: ModelClass<CareerCourseModel>,
    @Inject(CareerModel.name)
    private careerModel: ModelClass<CareerModel>,
  ) {
    super(CareerCoursesService.name);
  }

  async findTotalCreditsByCareer(careerCode: number) {
    const career = await this.careerModel
      .query()
      .where('code', careerCode)
      .first();
    const onlyMandatoryCreds = await this.careerModel
      .query()
      .sum('courses.credits as total_credits')
      .join('career_courses', 'careers.code', 'career_courses.career_code')
      .join('courses', 'career_courses.course_code', 'courses.code')
      .where('careers.code', careerCode)
      .andWhere('career_courses.mandatory', true)
      .groupBy('careers.name')
      .first();
    const totalCredits = await this.careerModel
      .query()
      .sum('courses.credits as total_credits')
      .join('career_courses', 'careers.code', 'career_courses.career_code')
      .join('courses', 'career_courses.course_code', 'courses.code')
      .where('careers.code', careerCode)
      .groupBy('careers.name')
      .first();
    return {
      career_name: career.name,
      career_code: career.code,
      total_credits: +totalCredits['total_credits'],
      mandatory_credits: +onlyMandatoryCreds['total_credits'],
    };
  }

  create(createCareerCourseDto: CreateCareerCourseDto) {
    return 'This action adds a new careerCourse';
  }

  findAll() {
    return `This action returns all careerCourses`;
  }

  async findCoursesByCareer(careerCode: number) {
    return await this.careerCourseModel
      .query()
      .joinRaw(
        'JOIN career_fields ON (career_courses.career_code = career_fields.career_code AND career_courses.field = career_fields.field_number)',
      )
      .select('career_courses.*', 'career_fields.name as field_name')
      .orderBy('semester')
      .where('career_courses.career_code', careerCode)
      .withGraphFetched('course')
      .modifyGraph('course', (builder) => {
        builder.select('name as course_name', 'credits');
      });
  }

  async getCareerSemesters(careerCode: number) {
    return await this.careerCourseModel
      .query()
      .distinct('semester')
      .where('career_code', careerCode)
      .orderBy('semester');
  }

  findOne(id: number) {
    return `This action returns a #${id} careerCourse`;
  }

  update(id: number, updateCareerCourseDto: UpdateCareerCourseDto) {
    return `This action updates a #${id} careerCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} careerCourse`;
  }
}
