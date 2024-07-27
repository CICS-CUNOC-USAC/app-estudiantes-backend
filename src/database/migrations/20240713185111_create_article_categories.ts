import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('article_categories', (table) => {
    table.increments('id').primary();
    table.string('category').notNullable();
    table.text('description');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('article_categories');
}
