import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('periods').del();
  const periods: any[] = [];
  //Create the same periods for all weekdays
  [1, 2, 3, 4, 5].forEach((weekday) => {
    for (let index = 1; index < 12; index++) {
      periods.push({
        hour_id: index,
        weekday_id: weekday,
      });
    }
  });

  return knex('periods').insert(periods);
}
