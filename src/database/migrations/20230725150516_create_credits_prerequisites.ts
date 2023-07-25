import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('credits_prerequisites', (t) => {
    t.increments('id').primary();
    t.integer('career_course_prerequisite_id')
      .notNullable()
      .references('id')
      .inTable('career_courses_prerequisites')
      .onDelete('CASCADE');
    t.integer('credits').notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('credits_prerequisites');
}
