import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('schedules').del();
  return knex('schedules').insert([
    //IPC 1
    {
      career_code: 58,
      course_code: '2796',
      section_id: 1,
      classroom_id: 1
    },
  ]);
}
