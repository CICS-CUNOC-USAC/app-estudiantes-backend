import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('content').notNullable();
    table.string('strapi_post_id').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('parent_id')
      .nullable()
      .references('id')
      .inTable('comments')
      .onDelete('CASCADE');
    table.timestamps(true, true);

    table.index(['strapi_post_id']);
    table.index(['user_id']);
    table.index(['parent_id']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('comments');
}
