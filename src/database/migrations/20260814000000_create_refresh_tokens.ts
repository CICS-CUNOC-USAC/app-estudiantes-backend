import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('refresh_tokens', (t) => {
    t.increments('id').primary();
    t.string('token_hash', 64).notNullable();
    t.enu('entity_type', ['user', 'staff']).notNullable();
    t.integer('entity_id').notNullable();
    t.text('device_info').nullable();
    t.string('ip_address', 45).nullable();
    t.timestamp('expires_at').notNullable();
    t.boolean('revoked').notNullable().defaultTo(false);
    t.timestamps(true, true);

    t.index(['token_hash']);
    t.index(['entity_type', 'entity_id']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('refresh_tokens');
}
