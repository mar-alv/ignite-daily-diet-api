import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { errorHandler } from './error-handler'
import { usersRoutes } from './routes/users'

export const app = fastify()

app.register(cookie)

app.setErrorHandler(errorHandler)

app.register(usersRoutes, {
  prefix: 'users',
})
