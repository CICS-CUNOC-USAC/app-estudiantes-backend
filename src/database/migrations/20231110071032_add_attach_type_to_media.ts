import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('media', (t) => {
    t.string('attach_type', 500).notNullable().defaultTo('nocat');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('media', (t) => {
    t.dropColumn('attach_type');
  });
}
