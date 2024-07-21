import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('plates', (table) => {
    table.uuid('user_id').after('id').notNullable()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

    table.text('description').nullable().alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('plates', (table) => {
    table.dropForeign('user_id')
    table.dropColumn('user_id')

    table.text('description').notNullable().alter()
  })
}
