import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('courses', (t) => {
    t.integer('code').notNullable();
    t.string('name', 350).notNullable();
    t.text('description').notNullable();
    t.integer('credits').notNullable();
    t.primary(['code']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('courses');
}
