import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('article_categories').del();
  return knex('article_categories').insert([
    {
      category: 'General',
      description: 'Articulo General',
    },
    {
      category: 'Ciencias de la Computacion',
      description: 'Articulo de Ciencias de la Computacion',
    },
    {
      category: 'Inteligencia Artificial',
      description: 'Articulo de Inteligencia Artificial',
    },
    {
      category: 'Ingenieria de Software',
      description: 'Articulo de Ingenieria de Software',
    },
    {
      category: 'Informacion',
      description: 'Articulo Informativo',
    },
  ]);
}
