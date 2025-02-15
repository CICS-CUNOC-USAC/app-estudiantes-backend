import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('hours').del();
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

  const hours = [];
  for (let index = 0; index < times.length - 1; index++) {
    const time = times[index];
    hours.push({
      start_time: time,
      end_time: times[index + 1],
    });
  }

  return knex('hours').insert(hours);
}
