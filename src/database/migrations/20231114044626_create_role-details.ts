import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('role_details', (table) => {
    table.increments('id').primary();
    table.integer('role_id').notNullable().references('id').inTable('roles');
    table.integer('staff_id').notNullable().references('id').inTable('staffs');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('role_details');
}
