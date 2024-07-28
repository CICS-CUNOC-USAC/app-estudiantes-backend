import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('user_courses_progress', (t) => {
    t.integer('semester').notNullable().defaultTo(1);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('user_courses_progress', (t) => {
    t.dropColumn('semester');
  });
}
