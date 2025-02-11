import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('library_receipts', (table) => {
    table.increments('id').primary();
    table.string('ra', 20).references('ra').inTable('users');
    table.string('personal_id');
    table.string('place').notNullable();
    table
      .string('library_reference_id')
      .notNullable()
      .references('id')
      .inTable('library_references');
    table.timestamp('returned_at');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('library_receipts');
}
