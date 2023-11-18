import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('role_details').del();
  await knex('staffs').del();
  const encryptedPassword = await bcrypt.hash(process.env.STAFF_PASSWORD, 10);
  return knex('staffs').insert([
    {
      email: process.env.STAFF_EMAIL,
      encrypted_password: encryptedPassword,
      first_name: process.env.STAFF_FIRST_NAME,
      last_name: process.env.STAFF_LAST_NAME,
    },
  ]);
}
