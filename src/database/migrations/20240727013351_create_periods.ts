import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('periods', (table) => {
    table.increments('id').primary();
    table
      .integer('weekday_id')
      .notNullable()
      .references('id')
      .inTable('weekdays');
    table.integer('hour_id').notNullable().references('id').inTable('hours');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('periods');
}
