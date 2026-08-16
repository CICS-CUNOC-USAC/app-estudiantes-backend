import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable('refresh_tokens', (t) => {
    t.string('jti', 36).nullable();
    t.index(['jti']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('refresh_tokens', (t) => {
    t.dropIndex(['jti']);
    t.dropColumn('jti');
  });
}
