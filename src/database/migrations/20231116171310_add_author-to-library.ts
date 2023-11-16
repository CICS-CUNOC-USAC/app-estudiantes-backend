import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('books', (table) => {
    table.text('author').notNullable().defaultTo('Sin autor/Desconocido');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('author');
  });
}
