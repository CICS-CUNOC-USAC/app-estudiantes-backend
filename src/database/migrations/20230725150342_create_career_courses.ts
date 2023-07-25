import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('career_courses', (t) => {
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
    t.integer('semester').notNullable();
    t.integer('field').notNullable();
    t.boolean('mandatory').notNullable();
    t.primary(['career_code', 'course_code']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('career_courses');
}
