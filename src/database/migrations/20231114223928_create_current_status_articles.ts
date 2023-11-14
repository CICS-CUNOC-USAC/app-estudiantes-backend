import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('current_status_articles', (table) => {
    table.increments('id').primary();
    table.integer('article_id').notNullable();
    table.integer('status_id').notNullable();
    table.foreign('article_id').references('id').inTable('articles');
    table.foreign('status_id').references('id').inTable('article_statuses');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema;
}
