import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('career_courses_prerequisites', (t) => {
    t.increments('id').primary();
    t.integer('career_code')
      .notNullable()
      .references('code')
      .inTable('careers')
      .onDelete('CASCADE');
    t.integer('course_code')
      .notNullable()
      .references('code')
      .inTable('courses')
      .onDelete('CASCADE');
    t.boolean('is_course').notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('career_courses_prerequisites');
}
