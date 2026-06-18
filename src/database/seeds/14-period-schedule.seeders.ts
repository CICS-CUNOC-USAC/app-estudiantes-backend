import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  await knex('period_schedule').del();

  const schedules = await knex('schedules').select('id').orderBy('id');
  const periods = await knex('periods').select('id', 'hour_id', 'weekday_id').orderBy('id');
  const weekdays = await knex('weekdays').select('id', 'name').orderBy('id');
  const hours = await knex('hours').select('id', 'start_time').orderBy('id');

  const weekdayIdByName = (name: string) => weekdays.find((w: any) => w.name === name)?.id;
  const hourIdByTime = (time: string) => hours.find((h: any) => String(h.startTime).startsWith(time))?.id;
  const periodId = (weekdayName: string, startTime: string) => {
    const wId = weekdayIdByName(weekdayName);
    const hId = hourIdByTime(startTime);
    return periods.find((p: any) => p.weekdayId === wId && p.hourId === hId)?.id;
  };

  const scheduleId = (index: number) => schedules[index]?.id;

  const periods_schedules: any[] = [];
  const mwf = ['Lunes', 'Miercoles', 'Viernes'];

  for (const day of mwf) {
    // IPC 1 - 13:40
    periods_schedules.push({ schedule_id: scheduleId(0), period_id: periodId(day, '13:40') });
    // Matematica Basica 1 - 13:40 + 14:30
    periods_schedules.push({ schedule_id: scheduleId(1), period_id: periodId(day, '13:40') });
    periods_schedules.push({ schedule_id: scheduleId(1), period_id: periodId(day, '14:30') });
    // Orientacion y Liderazgo - 19:30
    periods_schedules.push({ schedule_id: scheduleId(2), period_id: periodId(day, '19:30') });
    // Fisica Basica - 17:50
    periods_schedules.push({ schedule_id: scheduleId(3), period_id: periodId(day, '17:50') });
    // Quimica 1 - 17:50
    periods_schedules.push({ schedule_id: scheduleId(4), period_id: periodId(day, '17:50') });
    // Planeamiento - 16:10
    periods_schedules.push({ schedule_id: scheduleId(5), period_id: periodId(day, '16:10') });
    // Practica Final - 15:20
    periods_schedules.push({ schedule_id: scheduleId(6), period_id: periodId(day, '15:20') });
    // Preparacion y Evaluacion de Proyectos - 12:10
    periods_schedules.push({ schedule_id: scheduleId(7), period_id: periodId(day, '12:10') });
  }

  // Laboratorio IPC 1
  periods_schedules.push({ schedule_id: scheduleId(8), period_id: periodId('Martes', '13:40') });
  periods_schedules.push({ schedule_id: scheduleId(8), period_id: periodId('Martes', '14:30') });
  periods_schedules.push({ schedule_id: scheduleId(8), period_id: periodId('Jueves', '13:40') });

  // Laboratorio Matematica Basica 1
  periods_schedules.push({ schedule_id: scheduleId(9), period_id: periodId('Martes', '13:40') });
  periods_schedules.push({ schedule_id: scheduleId(9), period_id: periodId('Martes', '14:30') });
  periods_schedules.push({ schedule_id: scheduleId(9), period_id: periodId('Martes', '15:20') });

  return knex('period_schedule').insert(periods_schedules);
}
