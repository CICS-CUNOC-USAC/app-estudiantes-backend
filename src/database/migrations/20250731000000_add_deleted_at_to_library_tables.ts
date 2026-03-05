import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema
    .alterTable('library_references', (table) => {
      table.timestamp('deleted_at');
    })
    .then(() => {
      return knex.schema.alterTable('library_receipts', (table) => {
        table.timestamp('deleted_at');
      });
    });
}

export async function down(knex: Knex.Knex) {
  return knex.schema
    .alterTable('library_references', (table) => {
      table.dropColumn('deleted_at');
    })
    .then(() => {
      return knex.schema.alterTable('library_receipts', (table) => {
        table.dropColumn('deleted_at');
      });
    });
}
