import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('library_references', (table) => {
    table.string('id').primary();
    table.integer('book_id').notNullable().references('id').inTable('books');
    table.integer('total_availability').notNullable();
    table.integer('current_availability').notNullable();
    table.string('edition').notNullable();
    table.string('location').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('library_references');
}
