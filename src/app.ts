import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { errorHandler } from './error-handler'

import { platesRoutes } from './routes/plates'
import { usersRoutes } from './routes/users'

export const app = fastify()

app.setErrorHandler(errorHandler)

app.register(cookie)
app.register(platesRoutes, {
  prefix: 'users',
})
app.register(usersRoutes, {
  prefix: 'users',
})
