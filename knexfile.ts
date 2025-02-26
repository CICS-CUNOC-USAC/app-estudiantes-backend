import * as dotenv from 'dotenv';
import * as Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

dotenv.config();

const commonConfig = {
  client: process.env.DB_PROVIDER,
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migration.stub.ts',
    extension: 'ts',
    schemaName: process.env.DB_SCHEMA,
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/seed.stub.ts',
    extension: 'ts',
  },
  ...knexSnakeCaseMappers(),
};

module.exports = {
  development: {
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      searchPath: [process.env.DB_SCHEMA],
    },
    ...commonConfig,
  },
  production: {
    client: process.env.DB_PROVIDER,
    migrations: {
      directory: './src/database/migrations',
      loadExtensions: ['.js'],
    },
    seeds: {
      directory: './src/database/seeds',
      loadExtensions: ['.js'],
    },
    ...knexSnakeCaseMappers(),
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
  },
} as Knex.Knex.Config;
