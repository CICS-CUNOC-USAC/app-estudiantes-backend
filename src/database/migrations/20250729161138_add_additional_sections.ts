import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  return knex('sections').insert([
    {
      name: 'C',
    },
    {
      name: 'D',
    },
    {
      name: 'E',
    },
    {
      name: 'F',
    },
    {
      name: 'G',
    },
  ]);
}

export async function down(knex: Knex.Knex) {
  return knex('sections')
    .whereIn('name', ['C','D','E','F','G'])
    .del();
}
