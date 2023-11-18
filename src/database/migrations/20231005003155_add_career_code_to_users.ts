import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  const hasRecord = await knex('careers').where('code', 0).first();
  if (!hasRecord) {
    await knex('careers').insert({ code: 0, name: 'Sin Carrera' });
  }

  return knex.schema.alterTable('users', (t) => {
    t.integer('career_code')
      .notNullable()
      .references('code')
      .inTable('careers')
      .defaultTo(58)
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.alterTable('users', (t) => {
    t.dropColumn('career_code');
  });
}
