import * as Knex from 'knex';

async function findForeignKeyName(
  knex: Knex.Knex,
  table: string,
  column: string,
): Promise<string | null> {
  const result = await knex.raw(
    `
    SELECT tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.table_name = ?
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = ?
    `,
    [table, column],
  );
  return result.rows[0]?.constraint_name ?? null;
}

async function dropForeignKeyByColumn(
  knex: Knex.Knex,
  table: string,
  column: string,
) {
  const fkName = await findForeignKeyName(knex, table, column);
  if (!fkName) {
    throw new Error(
      `Migration failed: could not locate the foreign key on ${table}.${column}`,
    );
  }
  await knex.raw(`ALTER TABLE ?? DROP CONSTRAINT ??`, [table, fkName]);
}

export async function up(knex: Knex.Knex) {
  // courses_prerequisites: add pensum_id, backfilled via its parent
  // pensum_courses_prerequisites row.
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.integer('pensum_id').nullable();
  });
  await knex.raw(`
    UPDATE courses_prerequisites
    SET pensum_id = pensum_courses_prerequisites.pensum_id
    FROM pensum_courses_prerequisites
    WHERE courses_prerequisites.career_course_prerequisite_id = pensum_courses_prerequisites.id
  `);
  const nullCount = await knex('courses_prerequisites')
    .whereNull('pensum_id')
    .count('* as count')
    .first();
  if (Number(nullCount.count) > 0) {
    throw new Error(
      `Migration failed: ${nullCount.count} courses_prerequisites rows have no matching pensum_courses_prerequisites parent`,
    );
  }
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.integer('pensum_id').notNullable().alter();
  });

  // Drop the old direct FKs to the global courses table on both
  // prerequisite tables.
  await dropForeignKeyByColumn(knex, 'courses_prerequisites', 'course_code');
  await dropForeignKeyByColumn(
    knex,
    'pensum_courses_prerequisites',
    'course_code',
  );

  // Replace with composite FKs scoped to (pensum_id, course_code) on
  // pensum_courses, mirroring the schedules table's pattern.
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.foreign(['pensum_id', 'course_code'])
      .references(['pensum_id', 'course_code'])
      .inTable('pensum_courses')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('pensum_courses_prerequisites', (t) => {
    t.foreign(['pensum_id', 'course_code'])
      .references(['pensum_id', 'course_code'])
      .inTable('pensum_courses')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex.Knex) {
  await knex.schema.alterTable('pensum_courses_prerequisites', (t) => {
    t.dropForeign(['pensum_id', 'course_code']);
  });
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.dropForeign(['pensum_id', 'course_code']);
  });

  await knex.schema.alterTable('pensum_courses_prerequisites', (t) => {
    t.foreign('course_code').references('code').inTable('courses');
  });
  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.foreign('course_code').references('code').inTable('courses');
  });

  await knex.schema.alterTable('courses_prerequisites', (t) => {
    t.dropColumn('pensum_id');
  });
}
