import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { checkIfSessionIdExists } from '../middlewares/check-if-session-id-exists'
import { knex } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' }),
      age: z
        .number()
        .min(12, { message: 'Age must be at least 12 years old' })
        .max(110, { message: 'Age must be no more than 110 years old' }),
      height: z
        .number()
        .min(130, { message: 'Height must be at least 130 cm' })
        .max(270, { message: 'Height must be no more than 270 cm' }),
      weight: z.number().min(30, { message: 'Weight must be at least 30 kg' }),
      sex: z.enum(['masculine', 'feminine'], {
        message: 'Please select either "masculine" or "feminine" as your sex',
      }),
    })

    const { age, height, name, sex, weight } = createUserBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      session_id: sessionId,
      name,
      age,
      height,
      weight,
      sex,
    })

    return reply.status(201).send()
  })

  app.get('/', async (request, reply) => {
    return await knex('users').select()
  })
}
