import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable().defaultTo('');
    table.string('file');
    table.string('source_url');
    table.integer('media_id').references('id').inTable('media');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('books');
}
