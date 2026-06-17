import * as Knex from 'knex';

export async function up(knex: Knex.Knex) {
  // Add pensum_id column (nullable first for migration)
  await knex.schema.alterTable('career_fields', (t) => {
    t.integer('pensum_id').nullable();
  });

  // Populate pensum_id from existing career_code → pensums mapping
  await knex.raw(`
    UPDATE career_fields
    SET pensum_id = pensums.id
    FROM pensums
    WHERE career_fields.career_code = pensums.career_code
  `);

  // Remove rows that couldn't be mapped (safety)
  await knex('career_fields').whereNull('pensum_id').delete();

  // Drop old PK and unique constraint
  await knex.schema.alterTable('career_fields', (t) => {
    t.dropPrimary();
    t.dropUnique(['career_code', 'field_number']);
    t.dropForeign(['career_code']);
    t.dropColumn('career_code');
  });

  // Make pensum_id not nullable, add FK, set new PK
  await knex.schema.alterTable('career_fields', (t) => {
    t.integer('pensum_id').notNullable().alter();
    t.foreign('pensum_id')
      .references('id')
      .inTable('pensums')
      .onDelete('CASCADE');
    t.primary(['pensum_id', 'field_number']);
  });
}

export async function down(knex: Knex.Knex) {
  // Add career_code back
  await knex.schema.alterTable('career_fields', (t) => {
    t.dropPrimary();
    t.dropForeign(['pensum_id']);
  });

  await knex.schema.alterTable('career_fields', (t) => {
    t.integer('career_code').nullable();
  });

  // Populate career_code from pensum_id → pensums mapping
  await knex.raw(`
    UPDATE career_fields
    SET career_code = pensums.career_code
    FROM pensums
    WHERE career_fields.pensum_id = pensums.id
  `);

  await knex.schema.alterTable('career_fields', (t) => {
    t.dropColumn('pensum_id');
  });

  await knex.schema.alterTable('career_fields', (t) => {
    t.integer('career_code').notNullable().alter();
    t.foreign('career_code')
      .references('code')
      .inTable('careers')
      .onDelete('CASCADE');
    t.primary(['career_code', 'field_number']);
    t.unique(['career_code', 'field_number']);
  });
}
