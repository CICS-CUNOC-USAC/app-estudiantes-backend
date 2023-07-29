import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('courses_prerequisites', (t) => {
    t.increments('id').primary();
    t.string('course_code')
      .notNullable()
      .references('code')
      .inTable('courses')
      .onDelete('CASCADE');
    t.integer('career_course_prerequisite_id')
      .notNullable()
      .references('id')
      .inTable('career_courses_prerequisites')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('courses_prerequisites');
}
