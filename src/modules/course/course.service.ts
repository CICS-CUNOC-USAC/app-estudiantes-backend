import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseModel } from './entities/course.model';
import { ModelClass } from 'objection';
import { CareerCourseModel } from '../career_courses/entities/career_course.entity';

@Injectable()
export class CourseService {
  constructor(
    @Inject(CourseModel.name)
    private courseModel: ModelClass<CourseModel>,
    @Inject(CareerCourseModel.name)
    private careerCourseModel: ModelClass<CareerCourseModel>,
  ) {}
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

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
