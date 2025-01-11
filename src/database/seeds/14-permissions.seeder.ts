import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  knex('permissions').del();
  return knex('permissions').insert([
    {
      name: 'Super-Administrador',
      description: 'Permiso que permite la administracion de todo',
      action: 'manage',
      subject: 'all',
    },
    {
      name: 'Escritor',
      description: 'Puede crear y editar contenido (artículos)',
      action: 'create',
      subject: 'Article',
    },
    {
      name: 'Revisor',
      description: 'Puede revisar y aprobar contenido (artículos)',
    },
    {
      name: 'Publicador',
      description: 'Puede publicar contenido previamente aprobado (artículos)',
    },
  ]);
}
