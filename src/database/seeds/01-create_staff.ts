import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('role_details').del();
  await knex('staffs').del();
  const encryptedPassword = await bcrypt.hash(process.env.STAFF_PASSWORD, 10);
  return knex('staffs').insert([
    {
      email: 'cics.cunoc@gmail.com',
      encrypted_password: encryptedPassword,
      first_name: 'Comite Ingenieria Sistemas',
      last_name: 'CUNOC 2023',
    },
  ]);
}
