import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('role_permissions', (table) => {
    table.integer('role_id').notNullable().references('id').inTable('roles');
    table
      .integer('permission_id')
      .notNullable()
      .references('id')
      .inTable('permissions');
    table.primary(['role_id', 'permission_id']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('role_permissions');
}
