// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      session_id?: string
      name: string
      age: number
      height: number
      weight: number
      sex: string
    }

    plates: {
      id: string
      user_id: string
      name: string
      description?: string
      created_at: string
      updated_at: string
      in_diet: boolean
    }
  }
}
