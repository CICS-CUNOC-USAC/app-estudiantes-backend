import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  knex('role_permissions').del();
  return knex('role_permissions').insert([
    {
      role_id: 1, //Superadmin role
      permission_id: 1, //Superadmin permission
    },
  ]);
}
