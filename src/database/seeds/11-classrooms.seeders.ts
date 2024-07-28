import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('classrooms').del();
  return knex('classrooms').insert([
    {name: '1'},
    {name: '3'},
    {name: '5'},
    {name: '6'},
    {name: '7'},
    {name: '8'},
    {name: '9'},
    {name: '10'},
    {name: '11'},
    {name: '12'},
    {name: '13'},
    {name: 'Laboratorio de Física'},
    {name: 'Salón de Proyecciones'},
    {name: 'Salón TICS'},
    {name: 'Laboratorio de Ingeniería Eléctrica'},
    {name: 'Laboratorio de Ingeniería Industrial '},
    {name: 'Salón Hugo Pineda'},
    {name: 'Salón Mayor'},
    {name: 'Salón de Dibujo'},
    {name: 'Cancha Deportiva'},
    {name: 'Laboratorio de Aguas'},
  ]);
}

