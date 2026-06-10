import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { BaseService } from 'src/core/utils/base-service';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { UserAchievementResponseDto } from './dto/user-achievement-response.dto';
import { AchievementModel } from './entities/achievement.model';
import { UserAchievementModel } from './entities/user-achievement.model';
import {
  CertificateParserService,
  ParsedCourse,
} from './certificate-parser.service';

interface ProcessedAchievement {
  id: number;
  title: string;
  description: string;
  iconUrl: string | null;
  grade: number | null;
  approvedAt: string;
}

export interface ProcessResult {
  newAchievements: ProcessedAchievement[];
  alreadyHad: number;
  coursesInPdf: number;
  coursesNotInCatalog: number;
}

@Injectable()
export class AchievementsService extends BaseService {
  constructor(
    @Inject(AchievementModel.name)
    private readonly achievementModel: ModelClass<AchievementModel>,
    @Inject(UserAchievementModel.name)
    private readonly userAchievementModel: ModelClass<UserAchievementModel>,
    private readonly certificateParserService: CertificateParserService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(AchievementsService.name);
  }

  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    return builder;
  }

  async processUserCertificate(
    userId: number,
    pdfBuffer: Buffer,
  ): Promise<ProcessResult> {
    const parsedCourses =
      await this.certificateParserService.parseCertificate(pdfBuffer);

    if (!parsedCourses.length) {
      throw new BadRequestException('El PDF no contiene cursos validos');
    }

    const parsedByCode = this.buildUniqueCoursesMap(parsedCourses);
    const courseCodes = [...parsedByCode.keys()];

    const achievementsInCatalog = await this.achievementModel
      .query()
      .whereIn('course_code', courseCodes);

    const catalogAchievementIds = achievementsInCatalog.map(
      (achievement) => achievement.id,
    );
    const existingUserAchievements = catalogAchievementIds.length
      ? await this.userAchievementModel
          .query()
          .where('user_id', userId)
          .whereIn('achievement_id', catalogAchievementIds)
      : [];

    const existingIdsSet = new Set(
      existingUserAchievements.map((achievement) => achievement.achievement_id),
    );

    const newAchievements = achievementsInCatalog.filter(
      (achievement) => !existingIdsSet.has(achievement.id),
    );

    const insertRows = newAchievements
      .map((achievement) => {
        const parsedCourse = parsedByCode.get(achievement.course_code);
        if (!parsedCourse) {
          return null;
        }

        return {
          user_id: userId,
          achievement_id: achievement.id,
          grade: parsedCourse.grade,
          approved_at: parsedCourse.approvedAt,
        };
      })
      .filter((item) => !!item);

    if (insertRows.length) {
      await this.dbTrxService.databaseTransaction(async (trx) => {
        await this.userAchievementModel.query(trx).insert(insertRows as any);

        return true;
      }, this.logger);
    }

    return {
      newAchievements: newAchievements.map((achievement) => {
        const parsedCourse = parsedByCode.get(achievement.course_code);
        return {
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          iconUrl: achievement.icon_url,
          grade: parsedCourse?.grade ?? null,
          approvedAt: this.toDateOnlyString(parsedCourse?.approvedAt),
        };
      }),
      alreadyHad: achievementsInCatalog.length - newAchievements.length,
      coursesInPdf: parsedCourses.length,
      coursesNotInCatalog: courseCodes.length - achievementsInCatalog.length,
    };
  }

  async getMyAchievements(userId: number): Promise<UserAchievementResponseDto[]> {
    const userAchievements = await this.userAchievementModel
      .query()
      .where('user_id', userId)
      .withGraphFetched('[achievement.course]')
      .orderBy('approved_at', 'desc');

    return userAchievements
      .filter((item) => !!item.achievement)
      .map((item) => ({
        id: item.achievement.id,
        title: item.achievement.title,
        description: item.achievement.description,
        iconUrl: item.achievement.icon_url,
        grade: item.grade,
        approvedAt: this.toDateOnlyString(item.approved_at),
        earnedAt: item.created_at,
        course: item.achievement.course
          ? {
              code: item.achievement.course.code,
              name: item.achievement.course.name,
            }
          : null,
      }));
  }

  private buildUniqueCoursesMap(parsedCourses: ParsedCourse[]) {
    const map = new Map<string, ParsedCourse>();

    for (const course of parsedCourses) {
      const existing = map.get(course.code);
      if (!existing) {
        map.set(course.code, course);
        continue;
      }

      const existingDate = new Date(existing.approvedAt).getTime();
      const currentDate = new Date(course.approvedAt).getTime();
      if (currentDate >= existingDate) {
        map.set(course.code, course);
      }
    }

    return map;
  }

  private toDateOnlyString(dateInput?: Date | string) {
    if (!dateInput) {
      return null;
    }

    if (typeof dateInput === 'string') {
      return dateInput.slice(0, 10);
    }

    return dateInput.toISOString().slice(0, 10);
  }
}