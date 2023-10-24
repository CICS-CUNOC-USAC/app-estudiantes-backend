import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const careers = [
    { code: 33, name: 'Civil' },
    { code: 34, name: 'Mecánica' },
    { code: 35, name: 'Industrial' },
    { code: 36, name: 'Mecánica Industrial' },
    { code: 58, name: 'Ciencias y Sistemas' },
  ];

  return knex('careers')
    .del()
    .then(() => knex('careers').insert(careers));
}
