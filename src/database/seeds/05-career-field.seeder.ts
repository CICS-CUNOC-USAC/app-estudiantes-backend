import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const pensums = await knex('pensums').select('id', 'career_code');
  const pensumByCareer = new Map(
    pensums.map((p: any) => [p.careerCode, p.id]),
  );

  const fields = [
    //Sistemas
    { careerCode: 58, field_number: 1, name: 'Area de Metodologia de Sistemas' },
    { careerCode: 58, field_number: 2, name: 'Area de Ciencias de la Computacion' },
    { careerCode: 58, field_number: 3, name: 'Area de Desarrollo de Software' },
    { careerCode: 58, field_number: 4, name: 'Area de Ciencias Basicas y Complementarias', common_field: true },
    { careerCode: 58, field_number: 5, name: 'EPS' },

    //Civil
    { careerCode: 33, field_number: 1, name: 'Area de Topografía y Transportes' },
    { careerCode: 33, field_number: 2, name: 'Area de Estructuras' },
    { careerCode: 33, field_number: 3, name: 'Area de Construcciones Civiles y Materiales de Construccion' },
    { careerCode: 33, field_number: 4, name: 'Area de Hidraulica y Recursos Hídricos' },
    { careerCode: 33, field_number: 5, name: 'Area de Planeamiento' },
    { careerCode: 33, field_number: 6, name: 'Area de Ciencias Basicas y Complementarias', common_field: true },
    { careerCode: 33, field_number: 7, name: 'Area de Geofisica' },
    { careerCode: 33, field_number: 8, name: 'Area de Administracion' },
    { careerCode: 33, field_number: 9, name: 'EPS' },

    //Mecanica 34
    { careerCode: 34, field_number: 1, name: 'Area Complementaria' },
    { careerCode: 34, field_number: 2, name: 'Area de Diseño' },
    { careerCode: 34, field_number: 3, name: 'Area de Ciencias Basicas y Complementarias', common_field: true },
    { careerCode: 34, field_number: 4, name: 'Area de Materiales de Ingenieria' },
    { careerCode: 34, field_number: 5, name: 'Area de Electrotecnia' },
    { careerCode: 34, field_number: 6, name: 'Diplomado en Administracion' },
    { careerCode: 34, field_number: 7, name: 'EPS' },

    //Industrial 35
    { careerCode: 35, field_number: 1, name: 'Area Basica' },
    { careerCode: 35, field_number: 2, name: 'Area Matematicas' },
    { careerCode: 35, field_number: 3, name: 'Area de Fisica' },
    { careerCode: 35, field_number: 4, name: 'Area Humanistica', common_field: true },
    { careerCode: 35, field_number: 5, name: 'Area de Mecanica' },
    { careerCode: 35, field_number: 6, name: 'Area Produccion' },
    { careerCode: 35, field_number: 7, name: 'Area Metodos Cuantitativos' },
    { careerCode: 35, field_number: 8, name: 'Area Financiera' },
    { careerCode: 35, field_number: 9, name: 'Area Administrativa' },
    { careerCode: 35, field_number: 10, name: 'Area Informatica' },
    { careerCode: 35, field_number: 11, name: 'Area Investigacion' },
    { careerCode: 35, field_number: 12, name: 'Area Ambiental' },
    { careerCode: 35, field_number: 13, name: 'Idioma' },

    //Mecanica Industrial 36
    { careerCode: 36, field_number: 1, name: 'Area de Administracion' },
    { careerCode: 36, field_number: 2, name: 'Area de Metodos Cuantitativos' },
    { careerCode: 36, field_number: 3, name: 'Area de Produccion' },
    { careerCode: 36, field_number: 4, name: 'Area Diseño' },
    { careerCode: 36, field_number: 5, name: 'Area de Materiales de Ingenieria' },
    { careerCode: 36, field_number: 6, name: 'Area Tecnica' },
    { careerCode: 36, field_number: 7, name: 'Area Complementaria' },
    { careerCode: 36, field_number: 8, name: 'Area de Ciencias Basicas', common_field: true },
    { careerCode: 36, field_number: 9, name: 'EPS' },
  ];

  const rows = fields
    .filter((f) => pensumByCareer.has(f.careerCode))
    .map((f) => ({
      pensum_id: pensumByCareer.get(f.careerCode),
      field_number: f.field_number,
      name: f.name,
      common_field: f.common_field ?? false,
    }));

  await knex('career_fields').del();
  return knex('career_fields').insert(rows);
}
