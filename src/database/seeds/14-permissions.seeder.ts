import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  knex('permissions').del();
  return knex('permissions').insert([
    {
      name: 'Super-Administrador',
      description: 'Permite la administracion de todo',
      action: 'manage',
      subject: 'all',
    },
    {
      name: 'Crear articulos',
      description: 'Puede crear artículos',
      action: 'create',
      subject: 'Article',
    },
    {
      name: 'Editar articulos',
      description: 'Puede editar artículos',
      action: 'update',
      subject: 'Article',
    },
    {
      name: 'Revisar articulos',
      description: 'Puede revisar y aprobar artículos',
      action: 'review',
      subject: 'Article',
    },
    {
      name: 'Publicar articulos',
      description: 'Puede publicar articulos previamente aprobados',
      action: 'publish',
      subject: 'Article',
    },
  ]);
}
