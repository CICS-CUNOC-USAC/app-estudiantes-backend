import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('alias').notNullable().unique();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('roles');
}
