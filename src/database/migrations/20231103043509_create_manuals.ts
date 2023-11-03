import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('manuals', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable().defaultTo('');
    table.string('file');
    table.string('url');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('manuals');
}
