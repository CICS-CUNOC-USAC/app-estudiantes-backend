import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  return knex('roles')
    .del()
    .then(() => {
      return knex('roles').insert([
        {
          alias: 'superadmin',
          name: 'Administrador completo',
          description: 'Tiene acceso a todo',
        },
        {
          alias: 'writer',
          name: 'Escritor',
          description: 'Puede crear y editar contenido (artículos)',
        },
        {
          alias: 'reviewer',
          name: 'Revisor',
          description: 'Puede revisar y aprobar contenido (artículos)',
        },
        {
          alias: 'publisher',
          name: 'Publicador',
          description:
            'Puede publicar contenido previamente aprobado (artículos)',
        },
      ]);
    })
    .then(async () => {
      const staff = await knex('staffs')
        .where('email', 'cics.cunoc@gmail.com')
        .first();
      const superadminRole = await knex('roles')
        .where('alias', 'superadmin')
        .first();
      return knex('role_details')
        .del()
        .then(() => {
          return knex('role_details').insert({
            staff_id: staff['id'],
            role_id: superadminRole['id'],
          });
        });
    });
}
