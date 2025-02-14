import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('hours', (table) => {
    table.increments('id').primary();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('hours');
}
