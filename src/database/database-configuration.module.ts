import * as Knex from 'knex';
import { Model } from 'objection';
import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CourseModel } from 'src/modules/course/entities/course.model';
import { CareerModel } from 'src/modules/career/entities/career.model';
import { CareerCourseModel } from 'src/modules/career_courses/entities/career_course.entity';
import { UserModel } from 'src/modules/users/entities/user.model';
import { ProfileModel } from 'src/modules/profiles/entities/profile.model';
import { StaffModel } from 'src/modules/staffs/entities/staff.model';

dotenv.config();

// Insert database models here
const models = [
  CourseModel,
  CareerModel,
  CareerCourseModel,
  UserModel,
  ProfileModel,
  StaffModel,
];

const modelProviders = models.map((model) => {
  return {
    provide: model?.name,
    useValue: model,
  };
});

let databaseName = '';
let isDevelop = false;
switch (process.env.NODE_ENV) {
  case 'development':
    databaseName = process.env.DB_NAME_DEV;
    isDevelop = true;
    break;
  case 'production':
    databaseName = process.env.DB_NAME_PROD;
    break;
  case 'test':
    databaseName = process.env.DB_NAME_TEST;
    break;
  default:
    databaseName = process.env.DB_NAME_DEV;
    isDevelop = true;
    break;
}

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex.knex({
        client: process.env.DB_PROVIDER,
        connection: {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: databaseName,
          debug: isDevelop,
        },
      });
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseConfigurationModule {}
