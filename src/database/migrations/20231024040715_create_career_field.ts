import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex.schema
    .createTable('career_fields', (t) => {
      t.integer('career_code')
        .notNullable()
        .references('code')
        .inTable('careers')
        .onDelete('CASCADE');
      t.integer('field_number').notNullable();
      t.string('name', 320).notNullable();
      t.unique(['career_code', 'field_number']);
      t.primary(['career_code', 'field_number']);
    })
    .then(() =>
      knex.schema.alterTable('career_courses', (t) => {
        console.log('altering table' + t);
        t.integer('field_number')
          .references('field_number')
          .inTable('career_fields')
          .onDelete('CASCADE');
      }),
    );
}

export async function down(knex: Knex.Knex) {
  return knex.schema
    .alterTable('career_courses', (t) => {
      t.dropColumn('field_number');
    })
    .then(() => knex.schema.dropTableIfExists('career_fields'));
}
