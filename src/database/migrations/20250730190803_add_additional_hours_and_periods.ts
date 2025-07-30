import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  const times = [
    '08:00',
    '08:50',
    '09:40',
    '10:30',
    '11:20',
  ];

  const hours = [];
  for (let index = 0; index < times.length - 1; index++) {
    const time = times[index];
    hours.push({
      start_time: time,
      end_time: times[index + 1],
    });
  }

  // Insert hours and get the ids
  const insertedHours = await knex('hours')
    .insert(hours)
    .returning(['id']); // Returns array of { id: number }

  // Prepare periods for each weekday_id (1 to 5)
  const weekdayIds = [1, 2, 3, 4, 5];
  const periods = [];

  for (const hour of insertedHours) {
    for (const weekday_id of weekdayIds) {
      periods.push({
        hour_id: hour.id,
        weekday_id,
      });
    }
  }

  await knex('periods').insert(periods);
}

export async function down(knex: Knex.Knex) {
  const times = [
    '08:00',
    '08:50',
    '09:40',
    '10:30',
    '11:20',
  ];

  const hourPairs = [];
  for (let index = 0; index < times.length - 1; index++) {
    hourPairs.push({
      start_time: times[index],
      end_time: times[index + 1],
    });
  }

  // Get IDs to delete periods first
  const hourIds = await knex('hours')
    .whereIn(['start_time', 'end_time'], hourPairs)
    .select('id');

  await knex('periods').whereIn('hour_id', hourIds.map((h) => h.id)).del();
  await knex('hours')
    .whereIn(['start_time', 'end_time'], hourPairs)
    .del();
}
