import { Test, TestingModule } from '@nestjs/testing';
import { CareerCoursesController } from './career_courses.controller';
import { CareerCoursesService } from './career_courses.service';

describe('CareerCoursesController', () => {
  let controller: CareerCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerCoursesController],
      providers: [CareerCoursesService],
    }).compile();

    controller = module.get<CareerCoursesController>(CareerCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
