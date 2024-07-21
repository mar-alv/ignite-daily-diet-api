import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { checkIfSessionIdExists } from '../middlewares/check-if-session-id-exists'
import { knex } from '../database'

export async function platesRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const createPlateBodySchema = z.object({
        userId: z.string().uuid({ message: 'A valid user ID is required.' }),
        name: z
          .string()
          .min(2, { message: 'Name must be at least 2 characters long' }),
        description: z.string().optional(),
        inDiet: z.boolean({
          message: 'Please specify if the plate is on a diet.',
        }),
      })

      const { description, inDiet, name, userId } = createPlateBodySchema.parse(
        request.body,
      )

      const { sessionId } = request.cookies

      const user = await knex('users')
        .where({
          id: userId,
          session_id: sessionId,
        })
        .first()

      if (!user) return reply.status(404).send({ error: 'User not found' })

      const plate = await knex('plates')
        .insert({
          id: randomUUID(),
          name,
          description: description ?? '',
          in_diet: inDiet,
          user_id: userId,
        })
        .returning(['id'])

      return reply.status(201).send({
        plateId: plate[0].id,
      })
    },
  )
}
