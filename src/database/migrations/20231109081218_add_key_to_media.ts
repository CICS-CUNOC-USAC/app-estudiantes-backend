import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('media', (t) => {
    t.string('key', 1000).notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('media', (t) => {
    t.dropColumn('key');
  });
}
