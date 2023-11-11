import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('media', (table) => {
    table.string('dir', 1000).notNullable().defaultTo('nocat');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('media', (table) => {
    table.dropColumn('dir');
  });
}
