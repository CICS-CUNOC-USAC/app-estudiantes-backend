import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('user_courses_progress', (t) => {
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
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('user_courses_progress');
}
