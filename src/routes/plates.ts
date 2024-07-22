import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { checkIfSessionIdExists } from '../middlewares/check-if-session-id-exists'
import { knex } from '../database'

export async function platesRoutes(app: FastifyInstance) {
  app.post(
    '/:userId/plates',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const createPlateBodySchema = z.object({
        name: z
          .string()
          .min(2, { message: 'Name must be at least 2 characters long' }),
        description: z.string().optional(),
        inDiet: z.boolean({
          message: 'Please specify if the plate is on a diet.',
        }),
      })

      const createPlateRouteParamsSchema = z.object({
        userId: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { description, inDiet, name } = createPlateBodySchema.parse(
        request.body,
      )

      const { userId } = createPlateRouteParamsSchema.parse(request.params)

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
