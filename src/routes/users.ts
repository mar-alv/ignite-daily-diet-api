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

    const user = await knex('users')
      .insert({
        id: randomUUID(),
        session_id: sessionId,
        name,
        age,
        height,
        weight,
        sex,
      })
      .returning(['id'])

    return reply.status(201).send({
      userId: user[0].id,
    })
  })

  app.get(
    '/:id',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const getUserRouteParamsSchema = z.object({
        id: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { id } = getUserRouteParamsSchema.parse(request.params)

      const user = await knex('users')
        .select('name', 'age', 'height', 'weight', 'sex')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      if (!user) return reply.status(404).send({ error: 'User not found' })

      return { user }
    },
  )

  app.get(
    '/:id/metrics',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const getUserRouteParamsSchema = z.object({
        id: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { id } = getUserRouteParamsSchema.parse(request.params)

      const user = await knex('users')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      if (!user) return reply.status(404).send({ error: 'User not found' })

      const plates = await knex('plates')
        .where({
          user_id: id,
        })
        .orderBy('created_at')

      const { bestDietSequence, platesInDiet } = plates.reduce(
        (acc, meal) => {
          if (meal.in_diet) {
            acc.currentSequence += 1
            acc.platesInDiet += 1
          } else {
            acc.currentSequence = 0
          }

          if (acc.currentSequence > acc.bestDietSequence) {
            acc.bestDietSequence = acc.currentSequence
          }

          return acc
        },
        { bestDietSequence: 0, currentSequence: 0, platesInDiet: 0 },
      )

      const totalPlates = plates.length
      const platesOutDiet = totalPlates - platesInDiet
      const dietPercentage =
        totalPlates > 0 ? (platesInDiet / totalPlates) * 100 : 0

      return {
        bestDietSequence,
        platesAmount: totalPlates,
        dietPercentage: Number(dietPercentage),
        platesOnDiet: platesInDiet,
        platesOutOfDiet: platesOutDiet,
      }
    },
  )
}
