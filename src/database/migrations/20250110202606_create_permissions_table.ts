import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('permissions', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.string('action').notNullable();
    table.string('subject').notNullable();
    table.json('conditions');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('permissions');
}
