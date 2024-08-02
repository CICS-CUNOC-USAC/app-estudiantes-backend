import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('period_schedule').del();
  const periods_schedules = [];
  [0, 1, 2].forEach((i) => {
    //IPC 1
    periods_schedules.push({
      schedule_id: 1,
      //Lunes,Miercoles,Viernes 13:40-14:30
      period_id: 3 + 22 * i,
    });

    //Matematica Basica 1 (mismos horarios que IPC 1)
    periods_schedules.push({
      schedule_id: 2,
      //Lunes,Miercoles,Viernes 13:40-14:30
      period_id: 3 + 22 * i,
    });

    //Orientacion y Liderazgo
    periods_schedules.push({
      schedule_id: 3,
      //Lunes,Miercoles,Viernes 19:30-20:20
      period_id: 10 + 22 * i,
    });

    //Fisica Basica
    periods_schedules.push({
      schedule_id: 4,
      //Lunes,Miercoles,Viernes 17:50-18:40
      period_id: 8 + 22 * i,
    });

    //Quimica 1 (mismos horarios que Fisica Basica)
    periods_schedules.push({
      schedule_id: 5,
      //Lunes,Miercoles,Viernes 17:50-18:40
      period_id: 8 + 22 * i,
    });

    //Planeamiento
    periods_schedules.push({
      schedule_id: 6,
      //Lunes,Miercoles,Viernes 16:10-17:00
      period_id: 6 + 22 * i,
    });

    //Practica Final
    periods_schedules.push({
      schedule_id: 7,
      //Lunes,Miercoles,Viernes 15:20-16:10
      period_id: 5 + 22 * i,
    });

    //Preparacion y Evaluacion de Proyectos
    periods_schedules.push({
      schedule_id: 8,
      //Lunes,Miercoles,Viernes 12:10-13:00
      period_id: 2 + 22 * i,
    });
  });
  return knex('period_schedule').insert(periods_schedules);
}
