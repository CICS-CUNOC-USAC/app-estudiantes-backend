import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  await knex.schema.alterTable('pensum_courses', (t) => {
    t.string('name', 350).nullable();
    t.text('description').nullable();
    t.integer('credits').nullable();
  });

  await knex.raw(`
    UPDATE pensum_courses
    SET name = courses.name,
        description = courses.description,
        credits = courses.credits
    FROM courses
    WHERE pensum_courses.course_code = courses.code
  `);

  const nullCount = await knex('pensum_courses')
    .whereNull('name')
    .orWhereNull('description')
    .orWhereNull('credits')
    .count('* as count')
    .first();
  if (Number(nullCount.count) > 0) {
    throw new Error(
      `Migration failed: ${nullCount.count} pensum_courses rows have no matching course to backfill from`,
    );
  }

  await knex.schema.alterTable('pensum_courses', (t) => {
    t.string('name', 350).notNullable().alter();
    t.text('description').notNullable().alter();
    t.integer('credits').notNullable().alter();
  });
}

export async function down(knex: Knex.Knex) {
  await knex.schema.alterTable('pensum_courses', (t) => {
    t.dropColumn('name');
    t.dropColumn('description');
    t.dropColumn('credits');
  });
}
