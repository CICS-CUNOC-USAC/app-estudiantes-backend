import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PensumCoursePrerequisiteModel } from './entities/pensum_course_prerequisite.model';
import { CoursePrerequisiteModel } from './entities/course_prerequisite.model';
import { CreditsPrerequisiteModel } from './entities/credits_prerequisite.model';
import { CreatePrerequisiteDto } from './dto/create-prerequisite.dto';
import { UpdatePrerequisiteDto } from './dto/update-prerequisite.dto';
import { CourseModel } from '../course/entities/course.model';
import { PensumCourseModel } from './entities/pensum_course.entity';

@Injectable()
export class PrerequisitesService {
  constructor(
    @Inject(PensumCoursePrerequisiteModel.name)
    private prerequisiteModel: ModelClass<PensumCoursePrerequisiteModel>,
    @Inject(CoursePrerequisiteModel.name)
    private coursePrerequisiteModel: ModelClass<CoursePrerequisiteModel>,
    @Inject(CreditsPrerequisiteModel.name)
    private creditsPrerequisiteModel: ModelClass<CreditsPrerequisiteModel>,
    @Inject(CourseModel.name)
    private courseModel: ModelClass<CourseModel>,
    @Inject(PensumCourseModel.name)
    private pensumCourseModel: ModelClass<PensumCourseModel>,
  ) {}

  async findByPensumAndCourse(pensumId: number, courseCode: string) {
    return this.prerequisiteModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', courseCode)
      .withGraphFetched('[coursePrerequisites.course, creditsPrerequisites]');
  }

  async create(pensumId: number, courseCode: string, dto: CreatePrerequisiteDto) {
    const courseInPensum = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId).where('course_code', courseCode).first();
    if (!courseInPensum) {
      throw new BadRequestException(`Course ${courseCode} does not belong to pensum ${pensumId}`);
    }

    if (dto.isCourse) {
      if (!dto.prerequisiteCourseCode) {
        throw new BadRequestException('prerequisiteCourseCode is required when isCourse is true');
      }
      if (dto.prerequisiteCourseCode === courseCode) {
        throw new BadRequestException('A course cannot be a prerequisite of itself');
      }
      await this.validateCourseExists(dto.prerequisiteCourseCode);
      await this.validatePrerequisiteSemester(pensumId, courseCode, dto.prerequisiteCourseCode);
      await this.validateNoDuplicateCoursePrerequisite(pensumId, courseCode, dto.prerequisiteCourseCode);
    } else {
      if (dto.credits === undefined || dto.credits === null) {
        throw new BadRequestException('credits is required when isCourse is false');
      }
      if (dto.credits <= 0) {
        throw new BadRequestException('credits must be greater than 0');
      }
    }

    const rule = await this.prerequisiteModel.query().insert({
      pensum_id: pensumId,
      course_code: courseCode,
      is_course: dto.isCourse,
    } as any);

    if (dto.isCourse) {
      await this.coursePrerequisiteModel.query().insert({
        course_code: dto.prerequisiteCourseCode,
        career_course_prerequisite_id: rule.id,
      } as any);
    } else {
      await this.creditsPrerequisiteModel.query().insert({
        credits: dto.credits,
        career_course_prerequisite_id: rule.id,
      } as any);
    }

    return this.prerequisiteModel
      .query()
      .findById(rule.id)
      .withGraphFetched('[coursePrerequisites.course, creditsPrerequisites]');
  }

  async update(id: number, dto: UpdatePrerequisiteDto) {
    const rule = await this.prerequisiteModel.query().findById(id);
    if (!rule) {
      throw new NotFoundException(`Prerequisite with id ${id} not found`);
    }

    if (dto.prerequisiteCourseCode !== undefined) {
      if (dto.prerequisiteCourseCode === rule.course_code) {
        throw new BadRequestException('A course cannot be a prerequisite of itself');
      }
      await this.validateCourseExists(dto.prerequisiteCourseCode);
      await this.validatePrerequisiteSemester(rule.pensum_id, rule.course_code, dto.prerequisiteCourseCode);
      await this.coursePrerequisiteModel
        .query()
        .where('career_course_prerequisite_id', id)
        .patch({ course_code: dto.prerequisiteCourseCode } as any);
    }

    if (dto.credits !== undefined) {
      if (dto.credits <= 0) {
        throw new BadRequestException('credits must be greater than 0');
      }
      await this.creditsPrerequisiteModel
        .query()
        .where('career_course_prerequisite_id', id)
        .patch({ credits: dto.credits });
    }

    return this.prerequisiteModel
      .query()
      .findById(id)
      .withGraphFetched('[coursePrerequisites.course, creditsPrerequisites]');
  }

  async remove(id: number) {
    const rule = await this.prerequisiteModel.query().findById(id);
    if (!rule) {
      throw new NotFoundException(`Prerequisite with id ${id} not found`);
    }
    return this.prerequisiteModel.query().deleteById(id);
  }

  private async validateCourseExists(courseCode: string) {
    const course = await this.courseModel.query().findById(courseCode);
    if (!course) {
      throw new BadRequestException(`Course ${courseCode} does not exist`);
    }
  }

  private async validatePrerequisiteSemester(
    pensumId: number,
    courseCode: string,
    prerequisiteCourseCode: string,
  ) {
    const course = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId).where('course_code', courseCode).first();
    const prerequisite = await this.pensumCourseModel
      .query()
      .where('pensum_id', pensumId).where('course_code', prerequisiteCourseCode).first();

    if (!prerequisite) {
      throw new BadRequestException(
        `Course ${prerequisiteCourseCode} does not belong to pensum ${pensumId}`,
      );
    }

    if (prerequisite.semester >= course.semester) {
      throw new BadRequestException(
        `Prerequisite course ${prerequisiteCourseCode} (semester ${prerequisite.semester}) must be from an earlier semester than ${courseCode} (semester ${course.semester})`,
      );
    }
  }

  private async validateNoDuplicateCoursePrerequisite(
    pensumId: number,
    courseCode: string,
    prerequisiteCourseCode: string,
  ) {
    const existing = await this.prerequisiteModel
      .query()
      .where('pensum_id', pensumId)
      .andWhere('course_code', courseCode)
      .andWhere('is_course', true)
      .withGraphFetched('coursePrerequisites')
      .then((rules) =>
        rules.some((r) =>
          r.coursePrerequisites?.some((cp) => cp.course_code === prerequisiteCourseCode),
        ),
      );
    if (existing) {
      throw new BadRequestException(
        `Course ${prerequisiteCourseCode} is already a prerequisite of ${courseCode} in this pensum`,
      );
    }
  }
}
