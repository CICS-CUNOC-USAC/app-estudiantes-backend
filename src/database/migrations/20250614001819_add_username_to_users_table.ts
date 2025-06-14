import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('username').notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('username');
  });
}
