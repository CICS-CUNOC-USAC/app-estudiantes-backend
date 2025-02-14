import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  knex('book_categories').del();
  return knex('book_categories').insert([
    {
      name: 'Matematicas',
      description: 'Libros de algebra y calculo',
    },
    {
      name: 'Fisica',
      description: 'Libros de fisica basica y avanzada',
    },
    {
      name: 'Desarrollo de Software',
      description: 'Libros de desarrollo de software',
    },
  ]);
}
