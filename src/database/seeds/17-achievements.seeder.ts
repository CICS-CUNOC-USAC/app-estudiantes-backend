import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('achievements').del();

  // const courses = await knex('courses').select('code', 'name');
  // if (!courses.length) {
  //   return;
  // }
  const acheivements = [
    {
      title: 'Qué buen lenguaje!',
      description: 'Has ganado el curso Compiladores 1',
      icon_url: null,
      course_code: '2803',
    },
    {
      title: 'Ya puedes conseguir trabajo',
      description: 'Has ganado el curso Compiladores 2',
      icon_url: null,
      course_code: '2810',
    },
  ];

  return knex('achievements').insert(
    // courses.map((course) => ({
    //   title: `Aprobo ${course.name}`,
    //   description: `Completaste exitosamente el curso de ${course.name}.`,
    //   icon_url: null,
    //   course_code: course.code,
    // })),
    acheivements.map((achievement) => ({
      title: achievement.title,
      description: achievement.description,
      icon_url: achievement.icon_url,
      course_code: achievement.course_code,
    })),
  );
}
