import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('manuals', (t) => {
    t.integer('media_id').references('id').inTable('media');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('manuals', (t) => {
    t.dropColumn('media_id');
  });
}
