import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('books', (table) => {
    table
      .integer('category_id')
      .notNullable()
      .references('id')
      .inTable('book_categories');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('category_id');
  });
}
