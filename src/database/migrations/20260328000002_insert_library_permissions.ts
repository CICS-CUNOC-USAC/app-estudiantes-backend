import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex('permissions').insert([
    {
      name: 'Gestionar libros',
      description: 'Puede crear, editar y eliminar libros',
      action: 'manage',
      subject: 'Book',
    },
    {
      name: 'Gestionar préstamos',
      description: 'Puede crear y gestionar préstamos de libros',
      action: 'manage',
      subject: 'Loan',
    },
    {
      name: 'Gestionar referencias de biblioteca',
      description:
        'Puede crear, editar y eliminar referencias de libros físicos',
      action: 'manage',
      subject: 'LibraryReference',
    },
  ]);
}

export async function down(knex: Knex.Knex) {
  return knex('permissions')
    .whereIn('subject', ['Book', 'Loan', 'LibraryReference'])
    .andWhere('action', 'manage')
    .delete();
}
