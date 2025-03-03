import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigurationModule } from './database/database-configuration.module';
import { CourseModule } from './modules/course/course.module';
import { CareerModule } from './modules/career/career.module';
import { DatabaseTransactionModule } from './database/transaction/database-transaction.module';
import { CareerCoursesModule } from './modules/career_courses/career_courses.module';
import { RegularAuthModule } from './modules/auth/regular/regular-auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { StaffsModule } from './modules/staffs/staffs.module';
import { GeneralAuthModule } from './modules/auth/general/general-auth.module';
import { StaffAuthModule } from './modules/auth/staff/staff-auth.module';
import { AppLoggerMiddleware } from './core/middlewares/logger.middleware';
import { UserCoursesProgressModule } from './modules/user-courses-progress/user-courses-progress.module';
import { ManualsModule } from './modules/manuals/manuals.module';
import { MediaModule } from './modules/media/media.module';
import { S3Module } from './modules/s3/s3.module';
import { RolesModule } from './modules/roles/roles.module';
import { RoleDetailsModule } from './modules/role-details/role-details.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { LibraryModule } from './modules/library/library.module';
import { ArticleCategoriesModule } from './modules/article_categories/article_categories.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { PeriodsModule } from './modules/periods/periods.module';
import { SectionsModule } from './modules/sections/sections.module';
import { WeekdaysModule } from './modules/weekdays/weekdays.module';
import { HoursModule } from './modules/hours/hours.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { CaslModule } from './modules/casl/casl.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Auth
    GeneralAuthModule,
    RegularAuthModule,
    StaffAuthModule,
    // Database
    DatabaseConfigurationModule,
    DatabaseTransactionModule,
    // Modules
    CourseModule,
    CareerModule,
    CareerCoursesModule,
    UsersModule,
    ProfilesModule,
    StaffsModule,
    UserCoursesProgressModule,
    ManualsModule,
    MediaModule,
    S3Module,
    RolesModule,
    RoleDetailsModule,
    ArticlesModule,
    LibraryModule,
    ArticleCategoriesModule,
    SchedulesModule,
    ClassroomsModule,
    PeriodsModule,
    SectionsModule,
    WeekdaysModule,
    HoursModule,
    PermissionsModule,
    CaslModule,
    RedisModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
