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
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
