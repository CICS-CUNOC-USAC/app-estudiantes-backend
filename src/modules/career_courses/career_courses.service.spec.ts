import { Test, TestingModule } from '@nestjs/testing';
import { CareerCoursesService } from './career_courses.service';

describe('CareerCoursesService', () => {
  let service: CareerCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareerCoursesService],
    }).compile();

    service = module.get<CareerCoursesService>(CareerCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
