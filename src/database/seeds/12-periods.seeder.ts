import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('periods').del();

  const hours = await knex('hours').select('id').orderBy('id');
  const weekdays = await knex('weekdays').select('id').orderBy('id');

  const periods: any[] = [];
  for (const weekday of weekdays) {
    for (const hour of hours) {
      periods.push({
        hour_id: hour.id,
        weekday_id: weekday.id,
      });
    }
  }

  return knex('periods').insert(periods);
}
