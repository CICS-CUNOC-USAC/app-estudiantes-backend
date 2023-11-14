import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('article_statuses', (table) => {
    table.increments('id').primary();
    table.string('status').notNullable();
    table.text('description');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema;
}
