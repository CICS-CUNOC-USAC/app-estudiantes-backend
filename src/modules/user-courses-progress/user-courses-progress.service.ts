import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserCoursesProgressDto } from './dto/update-user-courses-progress.dto';
import { BaseService } from 'src/core/utils/base-service';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { PensumCoursesService } from '../pensum_courses/pensum_courses.service';
import { PensumsService } from '../pensums/pensums.service';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { CareerProgressModel } from './entities/career-progress.model';
import { SemesterProgressModel } from './entities/semester-progress.model';
import { CourseSemesterProgressModel } from './entities/course-semester-progress.model';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

@Injectable()
export class UserCoursesProgressService extends BaseService {
  findUserProgressStats(userId: number, careerCode: number) {
    return this.findUserProgress(userId, careerCode, true);
  }
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(CareerProgressModel.name)
    private readonly careerProgressModel: ModelClass<CareerProgressModel>,
    @Inject(SemesterProgressModel.name)
    private readonly semesterProgressModel: ModelClass<SemesterProgressModel>,
    @Inject(CourseSemesterProgressModel.name)
    private readonly courseSemesterProgressModel: ModelClass<CourseSemesterProgressModel>,
    private pensumCoursesService: PensumCoursesService,
    private pensumsService: PensumsService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(UserCoursesProgressService.name);
  }

  async findUserProgress(
    userId: number,
    careerCode: number,
    onlyCredits = false,
  ) {
    const pensum = await this.pensumsService.findActiveByCareer(careerCode);

    const data = await this.careerProgressModel
      .query()
      .where('user_id', userId)
      .withGraphFetched(
        'semester_progress.courses_semester_progress.pensum_course.course',
      )
      .modifyGraph('semester_progress.courses_semester_progress', (builder) => {
        builder.orderBy('id');
      })
      .modifyGraph(
        'semester_progress.courses_semester_progress.pensum_course',
        (builder) => {
          builder
            .joinRaw(
              'JOIN pensums ON pensums.id = pensum_courses.pensum_id',
            )
            .joinRaw(
              'JOIN career_fields ON (career_fields.career_code = pensums.career_code AND pensum_courses.field = career_fields.field_number)',
            )
            .andWhere('pensum_courses.pensum_id', pensum.id)
            .select('career_fields.name as field_name', 'pensum_courses.*');
        },
      )
      .first();

    const credits =
      await this.pensumCoursesService.findTotalCreditsByPensum(pensum.id);
    let currentMandatoryCredsAccum = 0;
    let currentNotMandatoryCredsAccum = 0;
    let currentTotalCredsAccum = 0;
    data.semester_progress.forEach(({ courses_semester_progress }) => {
      courses_semester_progress.forEach(({ approved, pensum_course }) => {
        if (approved && pensum_course.mandatory) {
          currentMandatoryCredsAccum += pensum_course.course.credits;
          currentTotalCredsAccum += pensum_course.course.credits;
        } else if (approved) {
          currentNotMandatoryCredsAccum += pensum_course.course.credits;
          currentTotalCredsAccum += pensum_course.course.credits;
        }
      });
    });
    const response = {
      progress: data,
      current_credits: {
        mandatory_credits: currentMandatoryCredsAccum,
        not_mandatory_credits: currentNotMandatoryCredsAccum,
        total_credits: currentTotalCredsAccum,
      },
      mandatory_credits: credits.mandatory_credits,
      not_mandatory_credits: credits.not_mandatory_credits,
      available_credits: credits.total_credits,
    };
    if (onlyCredits) {
      delete response.progress;
    }
    return response;
  }

  async create(userId: number, careerCode: number, trx?: Transaction) {
    const pensum = await this.pensumsService.findActiveByCareer(careerCode);

    const semesters =
      await this.pensumCoursesService.getPensumSemesters(pensum.id);
    const courses =
      await this.pensumCoursesService.findCoursesByPensum(pensum.id);

    const careerProgressRecord = await this.careerProgressModel
      .query(trx)
      .insert({
        user_id: userId,
        career_code: careerCode,
        pensum_id: pensum.id,
      });

    const semesterProgressRecords = await this.semesterProgressModel
      .query(trx)
      .insert(
        semesters.map(({ semester }) => {
          return {
            career_progress_id: careerProgressRecord.id,
            semester,
          };
        }),
      );

    await Promise.all(
      semesterProgressRecords.map(async (semesterProgressRecord) => {
        const semesterCourses = courses.filter(
          ({ semester: courseSemester }) =>
            courseSemester === semesterProgressRecord.semester,
        );

        const courseSemesterProgressRecords = semesterCourses.map((course) => ({
          semester_progress_id: semesterProgressRecord.id,
          course_code: course.course_code,
          approved: false,
        }));

        await this.courseSemesterProgressModel
          .query(trx)
          .insert(courseSemesterProgressRecords);
      }),
    );

    const courseSemesterProgressRecords = await this.courseSemesterProgressModel
      .query(trx)
      .select('*')
      .whereIn(
        'semester_progress_id',
        semesterProgressRecords.map(({ id }) => id),
      );

    return courseSemesterProgressRecords;
  }

  findAll() {
    return `This action returns all userCoursesProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCoursesProgress`;
  }

  async update(
    updateUserCoursesProgressDto: UpdateUserCoursesProgressDto,
    careerProgressId: number,
    userId: number,
  ) {
    const { course_semester_progress_id: courseSemesterProgressId, approved } =
      updateUserCoursesProgressDto;
    const careerProgressRecord = await this.careerProgressModel
      .query()
      .findOne({ id: careerProgressId, user_id: userId });

    const courseSemesterProgressRecord = await this.courseSemesterProgressModel
      .query()
      .findOne({ id: courseSemesterProgressId });

    if (!careerProgressRecord || !courseSemesterProgressRecord) {
      return undefined;
    }

    return this.dbTrxService.databaseTransaction(async (trx) => {
      return this.courseSemesterProgressModel
        .query(trx)
        .patchAndFetchById(courseSemesterProgressId, { approved });
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userCoursesProgress`;
  }
}
