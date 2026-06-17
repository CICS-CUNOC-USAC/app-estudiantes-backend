import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  // Step 1: Create pensums table
  await knex.schema.createTable('pensums', (t) => {
    t.increments('id').primary();
    t.integer('career_code')
      .notNullable()
      .references('code')
      .inTable('careers')
      .onDelete('CASCADE');
    t.integer('year').notNullable();
    t.boolean('active').notNullable().defaultTo(true);
  });

  // Step 2: Populate pensums — one per distinct career in career_courses
  await knex.raw(`
    INSERT INTO pensums (career_code, year, active)
    SELECT DISTINCT career_code, 2012, true
    FROM career_courses
  `);
  // Dummy pensum for career 0 ("Sin Carrera") if it exists in careers
  const careerZero = await knex('careers').where('code', 0).first();
  if (careerZero) {
    const existingPensum = await knex('pensums')
      .where('career_code', 0)
      .first();
    if (!existingPensum) {
      await knex('pensums').insert({ career_code: 0, year: 2012, active: true });
    }
  }

  // Step 3: Drop FK on schedules referencing career_courses (must happen before PK change)
  // Also fix period_schedule FK to add missing ON DELETE CASCADE
  await knex.schema.alterTable('period_schedule', (t) => {
    t.dropForeign(['schedule_id']);
  });
  await knex.schema.alterTable('period_schedule', (t) => {
    t.foreign('schedule_id')
      .references('id')
      .inTable('schedules')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('schedules', (t) => {
    t.dropForeign(['career_code', 'course_code']);
  });

  // Step 4: Transform career_courses → pensum_courses
  await knex.schema.alterTable('career_courses', (t) => {
    t.integer('pensum_id').nullable();
  });
  await knex.raw(`
    UPDATE career_courses
    SET pensum_id = pensums.id
    FROM pensums
    WHERE career_courses.career_code = pensums.career_code
  `);
  const nullCount = await knex('career_courses')
    .whereNull('pensum_id')
    .count('* as count')
    .first();
  if (Number(nullCount.count) > 0) {
    throw new Error(
      `Migration failed: ${nullCount.count} career_courses rows have no matching pensum`,
    );
  }
  await knex.schema.alterTable('career_courses', (t) => {
    t.dropPrimary();
    t.dropForeign(['career_code']);
    t.dropColumn('career_code');
  });
  await knex.schema.alterTable('career_courses', (t) => {
    t.integer('pensum_id').notNullable().alter();
    t.foreign('pensum_id')
      .references('id')
      .inTable('pensums')
      .onDelete('CASCADE');
    t.primary(['pensum_id', 'course_code']);
  });
  await knex.schema.renameTable('career_courses', 'pensum_courses');

  // Step 5: Transform career_courses_prerequisites → pensum_courses_prerequisites
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.dropForeign(['career_course_prerequisite_id']);
  });
  await knex.schema.alterTable('credits_prerequisites', (t) => {
    t.dropForeign(['career_course_prerequisite_id']);
  });
  await knex.schema.alterTable('career_courses_prerequisites', (t) => {
    t.integer('pensum_id').nullable();
  });
  await knex.raw(`
    UPDATE career_courses_prerequisites
    SET pensum_id = pensums.id
    FROM pensums
    WHERE career_courses_prerequisites.career_code = pensums.career_code
  `);
  await knex.schema.alterTable('career_courses_prerequisites', (t) => {
    t.dropForeign(['career_code']);
    t.dropColumn('career_code');
  });
  await knex.schema.alterTable('career_courses_prerequisites', (t) => {
    t.integer('pensum_id').notNullable().alter();
    t.foreign('pensum_id')
      .references('id')
      .inTable('pensums')
      .onDelete('CASCADE');
  });
  await knex.schema.renameTable(
    'career_courses_prerequisites',
    'pensum_courses_prerequisites',
  );
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.foreign('career_course_prerequisite_id')
      .references('id')
      .inTable('pensum_courses_prerequisites')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('credits_prerequisites', (t) => {
    t.foreign('career_course_prerequisite_id')
      .references('id')
      .inTable('pensum_courses_prerequisites')
      .onDelete('CASCADE');
  });

  // Step 6: Transform schedules
  await knex.schema.alterTable('schedules', (t) => {
    t.integer('pensum_id').nullable();
  });
  await knex.raw(`
    UPDATE schedules
    SET pensum_id = pensums.id
    FROM pensums
    WHERE schedules.career_code = pensums.career_code
  `);
  await knex.schema.alterTable('schedules', (t) => {
    t.dropColumn('career_code');
  });
  await knex.schema.alterTable('schedules', (t) => {
    t.integer('pensum_id').notNullable().alter();
    t.foreign(['pensum_id', 'course_code'])
      .references(['pensum_id', 'course_code'])
      .inTable('pensum_courses')
      .onDelete('CASCADE');
  });

  // Step 7: Update career_progress
  await knex.schema.alterTable('career_progress', (t) => {
    t.integer('pensum_id').nullable();
  });
  await knex.raw(`
    UPDATE career_progress
    SET pensum_id = pensums.id
    FROM pensums
    WHERE career_progress.career_code = pensums.career_code
  `);
  await knex.schema.alterTable('career_progress', (t) => {
    t.integer('pensum_id').notNullable().alter();
    t.foreign('pensum_id')
      .references('id')
      .inTable('pensums')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex.Knex) {
  // Step 7 reverse
  await knex.schema.alterTable('career_progress', (t) => {
    t.dropForeign(['pensum_id']);
    t.dropColumn('pensum_id');
  });

  // Step 6 reverse
  await knex.schema.alterTable('schedules', (t) => {
    t.dropForeign(['pensum_id', 'course_code']);
  });
  await knex.schema.alterTable('schedules', (t) => {
    t.integer('career_code').nullable();
  });
  await knex.raw(`
    UPDATE schedules
    SET career_code = pensums.career_code
    FROM pensums
    WHERE schedules.pensum_id = pensums.id
  `);
  await knex.schema.alterTable('schedules', (t) => {
    t.dropColumn('pensum_id');
  });
  await knex.schema.alterTable('schedules', (t) => {
    t.integer('career_code').notNullable().alter();
  });

  // Step 5 reverse
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.dropForeign(['career_course_prerequisite_id']);
  });
  await knex.schema.alterTable('credits_prerequisites', (t) => {
    t.dropForeign(['career_course_prerequisite_id']);
  });
  await knex.schema.renameTable(
    'pensum_courses_prerequisites',
    'career_courses_prerequisites',
  );
  await knex.schema.alterTable('career_courses_prerequisites', (t) => {
    t.integer('career_code').nullable();
  });
  await knex.raw(`
    UPDATE career_courses_prerequisites
    SET career_code = pensums.career_code
    FROM pensums
    WHERE career_courses_prerequisites.pensum_id = pensums.id
  `);
  await knex.schema.alterTable('career_courses_prerequisites', (t) => {
    t.dropForeign(['pensum_id']);
    t.dropColumn('pensum_id');
  });
  await knex.schema.alterTable('career_courses_prerequisites', (t) => {
    t.integer('career_code').notNullable().alter();
    t.foreign('career_code')
      .references('code')
      .inTable('careers')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.foreign('career_course_prerequisite_id')
      .references('id')
      .inTable('career_courses_prerequisites')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('credits_prerequisites', (t) => {
    t.foreign('career_course_prerequisite_id')
      .references('id')
      .inTable('career_courses_prerequisites')
      .onDelete('CASCADE');
  });

  // Step 4 reverse
  await knex.schema.renameTable('pensum_courses', 'career_courses');
  await knex.schema.alterTable('career_courses', (t) => {
    t.dropPrimary();
    t.dropForeign(['pensum_id']);
  });
  await knex.schema.alterTable('career_courses', (t) => {
    t.integer('career_code').nullable();
  });
  await knex.raw(`
    UPDATE career_courses
    SET career_code = pensums.career_code
    FROM pensums
    WHERE career_courses.pensum_id = pensums.id
  `);
  await knex.schema.alterTable('career_courses', (t) => {
    t.dropColumn('pensum_id');
  });
  await knex.schema.alterTable('career_courses', (t) => {
    t.integer('career_code').notNullable().alter();
    t.foreign('career_code')
      .references('code')
      .inTable('careers')
      .onDelete('CASCADE');
    t.primary(['career_code', 'course_code']);
  });

  // Step 3 reverse
  await knex.schema.alterTable('schedules', (t) => {
    t.foreign(['career_code', 'course_code'])
      .references(['career_code', 'course_code'])
      .inTable('career_courses');
  });
  // Restore period_schedule FK without CASCADE (original state)
  await knex.schema.alterTable('period_schedule', (t) => {
    t.dropForeign(['schedule_id']);
  });
  await knex.schema.alterTable('period_schedule', (t) => {
    t.foreign('schedule_id').references('id').inTable('schedules');
  });

  // Step 1 reverse
  await knex.schema.dropTable('pensums');
}
