import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Auth
    GeneralAuthModule,
    RegularAuthModule,
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
  ],
})
export class AppModule {}
