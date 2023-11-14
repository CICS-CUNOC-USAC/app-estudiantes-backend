import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('history_articles_status', (table) => {
    table.increments('id').primary();
    table.text('message');
    table.dateTime('date_change').notNullable();
    table.integer('staff_id').notNullable();
    table.integer('article_id').notNullable();
    table.integer('status_id').notNullable();
    table.foreign('article_id').references('id').inTable('articles');
    table.foreign('status_id').references('id').inTable('article_statuses');
    table.foreign('staff_id').references('id').inTable('staffs');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema;
}
