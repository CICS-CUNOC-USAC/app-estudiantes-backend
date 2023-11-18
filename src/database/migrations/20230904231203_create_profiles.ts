import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('profiles', (t) => {
    t.increments('id').primary();
    t.string('first_name', 100).notNullable();
    t.string('last_name', 100).notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('profiles');
}
