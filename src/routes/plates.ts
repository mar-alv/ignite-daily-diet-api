import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { checkIfSessionIdExists } from '../middlewares/check-if-session-id-exists'
import { knex } from '../database'
import { dayjs } from '../libs/dayjs'

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
        createdAt: z
          .string()
          .optional()
          .transform((date) => {
            if (!date || date === 'invalid-date')
              date = new Date().toISOString()

            return dayjs.toDate(date)
          }),
      })

      const createPlateRouteParamsSchema = z.object({
        userId: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { createdAt, description, inDiet, name } =
        createPlateBodySchema.parse(request.body)

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
          created_at: createdAt,
          updated_at: createdAt,
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
          knex.raw('date(created_at) as createdAt'),
          knex.raw('date(updated_at) as updatedAt'),
          'created_at',
          'description',
          'id',
          'in_diet as inDiet',
          'name',
        )
        .where({ user_id: userId })
        .groupBy(
          'createdAt',
          'updatedAt',
          'description',
          'id',
          'inDiet',
          'name',
        )
        .orderBy('createdAt', 'asc')

      const platesGroupedByCreatedAtDate = plates
        .reverse()
        .reduce((acc, item) => {
          const date = item.createdAt.split(' ')[0]

          if (!acc[date]) {
            acc[date] = []
          }

          acc[date].push({
            ...item,
            inDiet: Boolean(item.inDiet),
            createdAt: item.created_at,
          })

          return acc
        }, {})

      return {
        plates: platesGroupedByCreatedAtDate,
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

  app.put(
    '/:userId/plates/:plateId',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const updatePlateBodySchema = z.object({
        name: z
          .string()
          .min(2, { message: 'Name must be at least 2 characters long' })
          .optional(),
        description: z.string().optional(),
        inDiet: z
          .boolean({
            message: 'Please specify if the plate is on a diet.',
          })
          .optional(),
        createdAt: z
          .string()
          .optional()
          .transform((value) => {
            if (value) return dayjs.toDate(value)

            return undefined
          })
          .refine(
            (isoString) => {
              if (isoString) {
                const date = new Date(isoString)

                return date <= new Date()
              }
              return true
            },
            {
              message: 'The date cannot be in the future.',
            },
          ),
      })

      const updatePlateRouteParamsSchema = z.object({
        plateId: z.string().uuid({
          message: 'Invalid plate ID',
        }),
        userId: z.string().uuid({
          message: 'Invalid user ID',
        }),
      })

      const { sessionId } = request.cookies

      const { plateId, userId } = updatePlateRouteParamsSchema.parse(
        request.params,
      )

      const { createdAt, description, inDiet, name } =
        updatePlateBodySchema.parse(request.body)

      const user = await knex('users')
        .where({
          id: userId,
          session_id: sessionId,
        })
        .first()

      if (!user) return reply.status(404).send({ error: 'User not found' })

      const plate = await knex('plates')
        .where({
          id: plateId,
          user_id: userId,
        })
        .first()

      if (!plate) return reply.status(404).send({ error: 'Plate not found' })

      const createdAtDate = createdAt
        ? new Date(createdAt).toISOString()
        : plate.created_at

      await knex('plates')
        .update({
          name: name ?? plate.name,
          description: description ?? plate.description,
          in_diet: inDiet ?? plate.in_diet,
          created_at: createdAtDate,
          updated_at: new Date().toISOString(),
        })
        .where({
          id: plateId,
          user_id: userId,
        })
        .returning(['id'])

      return reply.status(204).send()
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
