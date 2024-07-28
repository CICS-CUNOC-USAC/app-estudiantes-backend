import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('weekdays').del();
  return knex('weekdays').insert([
    {
      name: 'Lunes',
    },
    {
      name: 'Martes',
    },
    {
      name: 'Miercoles',
    },
    {
      name: 'Jueves',
    },
    {
      name: 'Viernes',
    },
  ]);
}
