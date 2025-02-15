import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('schedules').del();
  return knex('schedules').insert([
    //IPC 1
    {
      career_code: 58,
      course_code: '2796',
      section_id: 1,
      classroom_id: 1,
    },
    //Matematica Basica 1
    {
      career_code: 58,
      course_code: '169',
      section_id: 2,
      classroom_id: 2,
    },
    //Orientacion y Liderazgo
    {
      career_code: 58,
      course_code: '2666',
      section_id: 2,
      classroom_id: 3,
    },
    //Fisica Basica
    {
      career_code: 58,
      course_code: '072',
      section_id: 1,
      classroom_id: 4,
    },
    //Quimica 1
    {
      career_code: 58,
      course_code: '216',
      section_id: 2,
      classroom_id: 5,
    },
    //Planeamiento
    {
      career_code: 33,
      course_code: '912',
      section_id: 1,
      classroom_id: 6,
    },
    //Practica Final
    {
      career_code: 34,
      course_code: '2586',
      section_id: 2,
      classroom_id: 7,
    },
    //Preparacion y Evaluacion de Proyectos
    {
      career_code: 35,
      course_code: '909',
      section_id: 2,
      classroom_id: 7,
    },
    //Laboratorio IPC 1
    {
      career_code: 58,
      course_code: '2796',
      section_id: 1,
      classroom_id: 3,
      type: 'laboratory',
    },
    //Laboratorio Matematica Basica 1
    {
      career_code: 58,
      course_code: '169',
      section_id: 1,
      classroom_id: 1,
      type: 'laboratory',
    },
  ]);
}
