import { Inject, Injectable } from '@nestjs/common';
import { CreateCareerCourseDto } from './dto/create-career_course.dto';
import { UpdateCareerCourseDto } from './dto/update-career_course.dto';
import { ModelClass } from 'objection';
import { CareerCourseModel } from './entities/career_course.entity';
import { BaseService } from 'src/core/utils/base-service';

@Injectable()
export class CareerCoursesService extends BaseService {
  constructor(
    @Inject(CareerCourseModel.name)
    private careerCourseModel: ModelClass<CareerCourseModel>,
  ) {
    super(CareerCoursesService.name);
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
      .where('career_code', careerCode)
      .withGraphFetched('course')
      .modifyGraph('course', (builder) => {
        builder.select('name as course_name', 'credits');
      });
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
