import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigurationModule } from './database/database-configuration.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfigurationModule,
    CourseModule,
  ],
})
export class AppModule {}
