import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  const librarianRole = await knex('roles')
    .where('alias', 'librarian')
    .first();

  const libraryPermissions = await knex('permissions')
    .whereIn('subject', ['Book', 'Loan', 'LibraryReference'])
    .andWhere('action', 'manage')
    .select('id');

  return knex('role_permissions').insert(
    libraryPermissions.map((permission) => ({
      role_id: librarianRole['id'],
      permission_id: permission['id'],
    })),
  );
}

export async function down(knex: Knex.Knex) {
  const librarianRole = await knex('roles')
    .where('alias', 'librarian')
    .first();

  return knex('role_permissions')
    .where('role_id', librarianRole['id'])
    .delete();
}
