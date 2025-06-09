import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('library_references', (table) => {
    table.dropColumn('total_availability');
    table.dropColumn('current_availability');
    table.boolean('is_available').notNullable().defaultTo(true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('library_references', (table) => {
    table.integer('total_availability').notNullable().defaultTo(0);
    table.integer('current_availability').notNullable().defaultTo(0);
    table.dropColumn('is_available');
  });
}
