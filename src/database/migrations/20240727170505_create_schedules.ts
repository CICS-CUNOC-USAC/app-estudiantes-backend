import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('schedules', (table) => {
    table.increments('id').primary();
    table.integer('career_code')
    .notNullable();
    table.string('course_code')
    .notNullable();
    table.integer('section_id')
    .notNullable()
    .references('id')
    .inTable('sections');
    table.integer('classroom_id')
    .notNullable()
    .references('id')
    .inTable('classrooms');
    table.foreign(['career_code', 'course_code'])
    .references(['career_code', 'course_code'])
    .inTable('career_courses');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('schedules');
}
