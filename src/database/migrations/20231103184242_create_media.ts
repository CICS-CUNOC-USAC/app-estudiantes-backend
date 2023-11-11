import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('media', (t) => {
    t.increments('id').primary();
    t.string('filename', 500).notNullable();
    t.string('type', 500).notNullable();
    t.bigint('size').notNullable();
    t.string('path', 1000).notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('media');
}
