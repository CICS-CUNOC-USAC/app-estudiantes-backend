import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const existing = await knex('pensums').select('id').first();
  if (existing) {
    return;
  }

  const pensums = [
    { career_code: 33, year: 2012, active: true },
    { career_code: 34, year: 2012, active: true },
    { career_code: 35, year: 2012, active: true },
    { career_code: 36, year: 2012, active: true },
    { career_code: 58, year: 2016, active: true },
    { career_code: 0, year: 2012, active: true },
  ];

  return knex('pensums').insert(pensums);
}
