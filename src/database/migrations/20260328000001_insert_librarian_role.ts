import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex('roles').insert({
    alias: 'librarian',
    name: 'Bibliotecario',
    description:
      'Puede gestionar libros, préstamos y referencias de biblioteca',
  });
}

export async function down(knex: Knex.Knex) {
  return knex('roles').where('alias', 'librarian').delete();
}
