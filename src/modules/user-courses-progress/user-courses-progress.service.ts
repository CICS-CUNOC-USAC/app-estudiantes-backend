import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserCoursesProgressDto } from './dto/update-user-courses-progress.dto';
import { BaseService } from 'src/core/utils/base-service';
import { ModelClass, Transaction } from 'objection';
import { CareerCoursesService } from '../career_courses/career_courses.service';
import { groupBy } from 'lodash';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { CareerProgressModel } from './entities/career-progress.model';
import { SemesterProgressModel } from './entities/semester-progress.model';
import { CourseSemesterProgressModel } from './entities/course-semester-progress.model';

@Injectable()
export class UserCoursesProgressService extends BaseService {
  constructor(
    @Inject(CareerProgressModel.name)
    private readonly careerProgressModel: ModelClass<CareerProgressModel>,
    @Inject(SemesterProgressModel.name)
    private readonly semesterProgressModel: ModelClass<SemesterProgressModel>,
    @Inject(CourseSemesterProgressModel.name)
    private readonly courseSemesterProgressModel: ModelClass<CourseSemesterProgressModel>,
    private careerCoursesService: CareerCoursesService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(UserCoursesProgressService.name);
  }
  async findUserProgress(userId: number, careerCode: number) {
    const data = await this.careerProgressModel
      .query()
      .select('*')
      .where('user_id', userId)
      .withGraphFetched(
        'semester_progress.courses_semester_progress.career_course.course',
      )
      .modifyGraph('semester_progress.courses_semester_progress', (builder) => {
        builder.orderBy('id');
      })
      .first();

    const credits =
      await this.careerCoursesService.findTotalCreditsByCareer(careerCode);
    let currentCredsAccum = 0;
    data.semester_progress.forEach(({ courses_semester_progress }) => {
      courses_semester_progress.forEach(({ approved, career_course }) => {
        if (approved) {
          currentCredsAccum += career_course.course.credits;
        }
      });
    });
    const response = {
      progress: data,
      current_credits: currentCredsAccum,
      mandatory_credits: credits.mandatory_credits,
      available_credits: credits.total_credits,
    };
    return response;
  }

  async create(userId: number, careerCode: number, trx?: Transaction) {
    const semesters =
      await this.careerCoursesService.getCareerSemesters(careerCode);
    const courses =
      await this.careerCoursesService.findCoursesByCareer(careerCode);

    // return this.dbTrxService.databaseTransaction(async (trx) => {
    const careerProgressRecord = await this.careerProgressModel
      .query(trx)
      .insert({
        user_id: userId,
        career_code: careerCode,
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
    // }, this.logger);
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
    // First we have to check if the userIds match the careerProgressId's userId and the courseSemesterProgressId exists
    const careerProgressRecord = await this.careerProgressModel
      .query()
      .findOne({ id: careerProgressId, user_id: userId });

    const courseSemesterProgressRecord = await this.courseSemesterProgressModel
      .query()
      .findOne({ id: courseSemesterProgressId });

    // If there is no record found, then the user is not allowed to update this
    if (!careerProgressRecord || !courseSemesterProgressRecord) {
      return undefined; // Interceptor will handle the response (as not found)
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
