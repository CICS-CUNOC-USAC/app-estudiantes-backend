import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments('id').primary();
    table.string('title', 300).notNullable();
    table.text('description').notNullable();
    table.integer('staff_id').notNullable();
    table.integer('media_id').notNullable();
    table
      .foreign('staff_id')
      .references('id')
      .inTable('staffs')
      .onDelete('CASCADE');
    table.foreign('media_id').references('id').inTable('media');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('articles');
}
