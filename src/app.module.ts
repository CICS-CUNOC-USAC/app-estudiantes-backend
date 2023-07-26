import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigurationModule } from './database/database-configuration.module';
import { CourseModule } from './modules/course/course.module';
import { CareerModule } from './modules/career/career.module';
import { DatabaseTransactionModule } from './database/transaction/database-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfigurationModule,
    DatabaseTransactionModule,
    CourseModule,
    CareerModule,
  ],
})
export class AppModule {}
