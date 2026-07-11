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

export async function up(knex: Knex.Knex) {
  const fkName = await findForeignKeyName(
    knex,
    'pensum_courses',
    'course_code',
  );
  if (!fkName) {
    throw new Error(
      'Migration failed: could not locate the foreign key on pensum_courses.course_code -> courses.code',
    );
  }
  await knex.raw(
    `ALTER TABLE pensum_courses DROP CONSTRAINT ??`,
    [fkName],
  );
}

export async function down(knex: Knex.Knex) {
  await knex.schema.alterTable('pensum_courses', (t) => {
    t.foreign('course_code').references('code').inTable('courses');
  });
}
