import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('weekdays', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('weekdays');
}
