import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('periods').del();
  const periods: any[] = [];
  //Create the same periods for all weekdays
  [1, 2, 3, 4, 5].forEach((weekday) => {
    const times = [
      '12:10',
      '13:00',
      '13:40',
      '14:30',
      '15:20',
      '16:10',
      '17:00',
      '17:50',
      '18:40',
      '19:30',
      '20:20',
      '21:10',
    ];
    for (let index = 0; index < times.length - 1; index++) {
      const time = times[index];
      periods.push({
        start_time: time,
        end_time: times[index + 1],
        weekday_id: weekday,
      });
    }
  });

  return knex('periods').insert(periods);
}
