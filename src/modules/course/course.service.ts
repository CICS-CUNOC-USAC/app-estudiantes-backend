import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseModel } from 'src/database/models/course.model';
import { ModelClass } from 'objection';

@Injectable()
export class CourseService {
  constructor(
    @Inject(CourseModel.name)
    private courseModel: ModelClass<CourseModel>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll() {
    return await this.courseModel.query().select('*');
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
