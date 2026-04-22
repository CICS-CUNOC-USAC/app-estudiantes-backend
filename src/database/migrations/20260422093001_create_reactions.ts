import * as Knex from 'knex';

const reactionTypes = ['like', 'love', 'haha', 'sad', 'angry'];

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('reactions', (table) => {
    table.increments('id').primary();
    table.enu('type', reactionTypes).notNullable();
    table.string('strapi_post_id').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.unique(['strapi_post_id', 'user_id']);
    table.index(['strapi_post_id']);
    table.index(['user_id']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('reactions');
}
