import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('sections').del();
  return knex('sections').insert([
    {
      name: 'A',
    },
    {
      name: 'B',
    },
  ]);
}
