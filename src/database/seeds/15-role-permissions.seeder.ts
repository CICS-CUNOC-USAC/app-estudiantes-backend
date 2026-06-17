import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('role_permissions').del();

  const superadminRole = await knex('roles').where('alias', 'superadmin').first();
  const superadminPermission = await knex('permissions').where('subject', 'all').andWhere('action', 'manage').first();

  return knex('role_permissions').insert([
    {
      role_id: superadminRole.id,
      permission_id: superadminPermission.id,
    },
  ]);
}
