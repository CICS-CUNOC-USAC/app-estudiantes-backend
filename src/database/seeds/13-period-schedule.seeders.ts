import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('period_schedule').del();
  return knex('period_schedule').insert([
    //IPC 1
    {
      schedule_id: 1,
      //Lunes, 13:40-14:30
      period_id: 3,
    },
    {
      schedule_id: 1,
      //Miercoles, 13:40-14:30
      period_id: 25,
    },
    {
      schedule_id: 1,
      //Viernes, 13:40-14:30
      period_id: 47,
    },
  ]);
}
