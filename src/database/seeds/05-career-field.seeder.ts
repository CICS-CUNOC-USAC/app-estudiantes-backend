import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const career_fields = [
    //Sistemas
    {
      career_code: 58,
      field_number: 1,
      name: 'Area de Metodologia de Sistemas',
    },
    {
      career_code: 58,
      field_number: 2,
      name: 'Area de Ciencias de la Computacion',
    },
    {
      career_code: 58,
      field_number: 3,
      name: 'Area de Desarrollo de Software',
    },
    {
      career_code: 58,
      field_number: 4,
      name: 'Area de Ciencias Basicas y Complementarias',
      common_field: true,
    },
    { career_code: 58, field_number: 5, name: 'EPS' },

    //Civil
    {
      career_code: 33,
      field_number: 1,
      name: 'Area de Topografía y Transportes',
    },
    {
      career_code: 33,
      field_number: 2,
      name: 'Area de Estructuras',
    },
    {
      career_code: 33,
      field_number: 3,
      name: 'Area de Construcciones Civiles y Materiales de Construccion',
    },
    {
      career_code: 33,
      field_number: 4,
      name: 'Area de Hidraulica y Recursos Hídricos',
    },
    {
      career_code: 33,
      field_number: 5,
      name: 'Area de Planeamiento',
    },
    {
      career_code: 33,
      field_number: 6,
      name: 'Area de Ciencias Basicas y Complementarias',
      common_field: true,
    },
    {
      career_code: 33,
      field_number: 7,
      name: 'Area de Geofisica',
    },
    {
      career_code: 33,
      field_number: 8,
      name: 'Area de Administracion',
    },
    {
      career_code: 33,
      field_number: 9,
      name: 'EPS',
    },

    //Mecanica
    {
      career_code: 34,
      field_number: 1,
      name: 'Area Complementaria',
    },
    {
      career_code: 34,
      field_number: 2,
      name: 'Area de Diseño',
    },
    {
      career_code: 34,
      field_number: 3,
      name: 'Area de Ciencias Basicas y Complementarias',
      common_field: true,
    },
    {
      career_code: 34,
      field_number: 4,
      name: 'Area de Materiales de Ingenieria',
    },
    {
      career_code: 34,
      field_number: 5,
      name: 'Area de Electrotecnia',
    },
    {
      career_code: 34,
      field_number: 6,
      name: 'Diplomado en Administracion',
    },
    {
      career_code: 34,
      field_number: 7,
      name: 'EPS',
    },

    //Industrial
    {
      career_code: 35,
      field_number: 1,
      name: 'Area de Administracion',
    },
    {
      career_code: 35,
      field_number: 2,
      name: 'Area de Produccion',
    },
    {
      career_code: 35,
      field_number: 3,
      name: 'Area de Metodos Cuantitativos',
    },
    {
      career_code: 35,
      field_number: 4,
      name: 'Area Complementaria',
      common_field: true,
    },
    {
      career_code: 35,
      field_number: 5,
      name: 'Area Termica',
    },
    {
      career_code: 35,
      field_number: 6,
      name: 'Area de Materiales de Ingenieria',
    },
    {
      career_code: 35,
      field_number: 7,
      name: 'Area de Ciencias Basicas',
    },
    {
      career_code: 35,
      field_number: 8,
      name: 'Area de Diseño',
    },
    {
      career_code: 35,
      field_number: 9,
      name: 'EPS',
    },
    {
      career_code: 35,
      field_number: 10,
      name: 'Diplomado en Administracion',
    },

    //Mecanica Industrial
    {
      career_code: 36,
      field_number: 1,
      name: 'Area de Administracion',
    },
    {
      career_code: 36,
      field_number: 2,
      name: 'Area de Metodos Cuantitativos',
    },
    {
      career_code: 36,
      field_number: 3,
      name: 'Area de Produccion',
    },
    {
      career_code: 36,
      field_number: 4,
      name: 'Area Diseño',
    },
    {
      career_code: 36,
      field_number: 5,
      name: 'Area de Materiales de Ingenieria',
    },
    {
      career_code: 36,
      field_number: 6,
      name: 'Area Tecnica',
    },
    {
      career_code: 36,
      field_number: 7,
      name: 'Area Complementaria',
    },
    {
      career_code: 36,
      field_number: 8,
      name: 'Area de Ciencias Basicas',
      common_field: true,
    },
    {
      career_code: 36,
      field_number: 9,
      name: 'EPS',
    },
  ];

  return knex('career_fields')
    .del()
    .then(() => knex('career_fields').insert(career_fields));
}
