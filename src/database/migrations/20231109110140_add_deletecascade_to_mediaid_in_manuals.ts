import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('manuals', (t) => {
    t.dropForeign('media_id');
    t.foreign('media_id').references('id').inTable('media').onDelete('CASCADE');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('manuals', (t) => {
    t.dropForeign('media_id');
    t.foreign('media_id')
      .references('id')
      .inTable('media')
      .onDelete('NO ACTION');
  });
}
