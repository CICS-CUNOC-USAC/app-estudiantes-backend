import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('user_achievements', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('achievement_id')
      .notNullable()
      .references('id')
      .inTable('achievements')
      .onDelete('CASCADE');
    table.integer('grade').nullable();
    table.date('approved_at').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.unique(['user_id', 'achievement_id']);
    table.index(['user_id']);
    table.index(['achievement_id']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('user_achievements');
}