import { CreateUser, User } from '../interfaces/user'
import { knex } from '../src/database'

export async function getUserBySessionId(
  sessionId: string,
): Promise<User | undefined> {
  return await knex('users')
    .select('name', 'age', 'height', 'weight', 'sex')
    .where('session_id', sessionId)
    .first()
}

export async function addUser(user: CreateUser): Promise<User | undefined> {
  return await knex('users').insert(user)
}
