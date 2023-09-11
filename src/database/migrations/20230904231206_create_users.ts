import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('email', 100).notNullable();
    t.string('ra', 20).notNullable();
    t.string('encrypted_password', 100).notNullable();
    t.integer('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE');
    t.timestamps(true, true);
    t.unique(['email', 'ra', 'profile_id']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema;
}
