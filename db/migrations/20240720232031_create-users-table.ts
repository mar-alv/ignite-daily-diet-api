import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.uuid('session_id').after('id').index()
    table.text('name').notNullable()
    table.tinyint('age').notNullable().unsigned()
    table.tinyint('height').notNullable().unsigned()
    table.text('sex').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
