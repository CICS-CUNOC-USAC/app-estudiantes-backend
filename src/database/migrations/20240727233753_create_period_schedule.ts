import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('period_schedule', (table) => {
    table.integer('period_id')
    .notNullable()
    .references('id')
    .inTable('periods');
    table.integer('schedule_id')
    .notNullable()
    .references('id')
    .inTable('schedules');
    table.primary(['period_id', 'schedule_id']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('period_schedule');
}
