import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  const pensums = await knex('pensums').select('id', 'career_code');
  const pensumMap = new Map(
    pensums.map((p: any) => [p.careerCode, p.id]),
  );

  const classrooms = await knex('classrooms').select('id', 'name').orderBy('id');
  const sections = await knex('sections').select('id', 'name').orderBy('id');

  const classroomByIndex = (i: number) => classrooms[i]?.id;
  const sectionByName = (name: string) => sections.find((s: any) => s.name === name)?.id;

  await knex('period_schedule').del();
  await knex('schedules').del();
  return knex('schedules').insert([
    {
      pensum_id: pensumMap.get(58),
      course_code: '2796',
      section_id: sectionByName('A'),
      classroom_id: classroomByIndex(0),
    },
    {
      pensum_id: pensumMap.get(58),
      course_code: '169',
      section_id: sectionByName('B'),
      classroom_id: classroomByIndex(1),
    },
    {
      pensum_id: pensumMap.get(58),
      course_code: '2666',
      section_id: sectionByName('B'),
      classroom_id: classroomByIndex(2),
    },
    {
      pensum_id: pensumMap.get(58),
      course_code: '072',
      section_id: sectionByName('A'),
      classroom_id: classroomByIndex(3),
    },
    {
      pensum_id: pensumMap.get(58),
      course_code: '216',
      section_id: sectionByName('B'),
      classroom_id: classroomByIndex(4),
    },
    {
      pensum_id: pensumMap.get(33),
      course_code: '912',
      section_id: sectionByName('A'),
      classroom_id: classroomByIndex(5),
    },
    {
      pensum_id: pensumMap.get(34),
      course_code: '2586',
      section_id: sectionByName('B'),
      classroom_id: classroomByIndex(6),
    },
    {
      pensum_id: pensumMap.get(35),
      course_code: '909',
      section_id: sectionByName('B'),
      classroom_id: classroomByIndex(6),
    },
    {
      pensum_id: pensumMap.get(58),
      course_code: '2796',
      section_id: sectionByName('A'),
      classroom_id: classroomByIndex(2),
      type: 'laboratory',
    },
    {
      pensum_id: pensumMap.get(58),
      course_code: '169',
      section_id: sectionByName('A'),
      classroom_id: classroomByIndex(0),
      type: 'laboratory',
    },
  ]);
}
