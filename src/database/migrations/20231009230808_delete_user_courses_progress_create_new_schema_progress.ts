import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema
    .dropTableIfExists('user_courses_progress')
    .then(() =>
      knex.schema.createTable('career_progress', (t) => {
        t.increments('id').primary();
        t.integer('user_id').references('id').inTable('users').notNullable();
        t.integer('career_code')
          .references('code')
          .inTable('careers')
          .onDelete('CASCADE')
          .notNullable();
        t.timestamps(true, true);
      }),
    )
    .then(() =>
      knex.schema.createTable('semester_progress', (t) => {
        t.increments('id').primary();
        t.integer('career_progress_id')
          .references('id')
          .inTable('career_progress')
          .notNullable()
          .onDelete('CASCADE');
        t.integer('semester').notNullable();
        t.timestamps(true, true);
      }),
    )
    .then(() =>
      knex.schema.createTable('courses_semester_progress', (t) => {
        t.increments('id').primary();
        t.integer('semester_progress_id')
          .references('id')
          .inTable('semester_progress')
          .notNullable()
          .onDelete('CASCADE');
        t.string('course_code')
          .references('code')
          .inTable('courses')
          .notNullable();
        t.boolean('approved').defaultTo(false);
        t.timestamps(true, true);
      }),
    );
}

export async function down(knex: Knex.Knex) {
  return knex.schema
    .dropTableIfExists('courses_semester_progress')
    .then(() => knex.schema.dropTableIfExists('semester_progress'))
    .then(() => knex.schema.dropTableIfExists('career_progress'))
    .then(() =>
      knex.schema.createTable('user_courses_progress', (t) => {
        t.increments('id').primary();
        t.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        t.string('course_code')
          .notNullable()
          .references('code')
          .inTable('courses')
          .onDelete('CASCADE');
        t.boolean('approved').notNullable().defaultTo(false);
        t.integer('semester').notNullable().defaultTo(1);
        t.timestamps(true, true);
      }),
    );
}
