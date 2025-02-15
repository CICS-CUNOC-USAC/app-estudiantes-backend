import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable('career_fields', (t) => {
    t.integer('career_code')
      .notNullable()
      .references('code')
      .inTable('careers')
      .onDelete('CASCADE');
    t.integer('field_number').notNullable();
    t.string('name', 320).notNullable();
    t.boolean('common_field').notNullable().defaultTo(false);
    t.unique(['career_code', 'field_number']);
    t.primary(['career_code', 'field_number']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable('career_fields');
}
