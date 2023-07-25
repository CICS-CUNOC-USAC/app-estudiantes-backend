import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('careers', (t) => {
    t.integer('code').notNullable();
    t.string('name', 350).notNullable();
    t.primary(['code']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('careers');
}
