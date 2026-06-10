import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('achievements', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('description').notNullable();
    table.string('icon_url', 500).nullable();
    table
      .string('course_code', 20)
      .notNullable()
      .references('code')
      .inTable('courses')
      .onDelete('CASCADE');
    table.timestamps(true, true);

    table.unique(['course_code']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('achievements');
}