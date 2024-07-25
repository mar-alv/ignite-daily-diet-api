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

  app.get(
    '/:userId/plates',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const getPlatesRouteParamsSchema = z.object({
        userId: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { userId } = getPlatesRouteParamsSchema.parse(request.params)

      const user = await knex('users')
        .where({
          id: userId,
          session_id: sessionId,
        })
        .first()

      if (!user) return reply.status(404).send({ error: 'User not found' })

      const plates = await knex('plates')
        .select(
          'created_at as createdAt',
          'description',
          'id',
          'in_diet as inDiet',
          'name',
          'updated_at as updatedAt',
        )
        .where({ user_id: userId })

      return {
        plates: plates.map((plate) => {
          return {
            ...plate,
            inDiet: Boolean(plate.inDiet),
          }
        }),
      }
    },
  )

  app.get(
    '/:userId/plates/:plateId',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const getPlateRouteParamsSchema = z.object({
        plateId: z.string().uuid({
          message: 'Invalid plate ID',
        }),
        userId: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { plateId, userId } = getPlateRouteParamsSchema.parse(
        request.params,
      )

      const user = await knex('users')
        .where({
          id: userId,
          session_id: sessionId,
        })
        .first()

      if (!user) return reply.status(404).send({ error: 'User not found' })

      const plate = await knex('plates')
        .select(
          'created_at as createdAt',
          'description',
          'id',
          'in_diet as inDiet',
          'name',
          'updated_at as updatedAt',
        )
        .where({ id: plateId, user_id: userId })
        .first()

      if (!plate) return reply.status(404).send({ error: 'Plate not found' })

      return {
        plate: {
          ...plate,
          inDiet: Boolean(plate.inDiet),
        },
      }
    },
  )

  app.delete(
    '/:userId/plates/:plateId',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const deletePlateRouteParamsSchema = z.object({
        plateId: z.string().uuid({
          message: 'Invalid plate ID',
        }),
        userId: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { sessionId } = request.cookies

      const { plateId, userId } = deletePlateRouteParamsSchema.parse(
        request.params,
      )

      const user = await knex('users')
        .where({
          id: userId,
          session_id: sessionId,
        })
        .first()

      if (!user) return reply.status(404).send({ error: 'User not found' })

      await knex('plates')
        .del()
        .where({
          id: plateId,
          user_id: userId,
        })
        .then((platesDeleted) => {
          if (!platesDeleted)
            reply.status(404).send({ error: 'Plate not found' })
        })

      return reply.status(204).send()
    },
  )
}
