// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      age: number
      height: number
      weight: number
      sex: string
      session_id?: string
    }
  }
}
