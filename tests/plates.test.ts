import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'child_process'
import request from 'supertest'

import { app } from '../src/app'

describe('plates routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  describe('create plate tests', () => {
    it('should not be able to create a plate if userId is invalid', async () => {
      const createUserResponse = await request(app.server)
        .post('/users')
        .send({
          name: 'mar alv',
          age: 30,
          height: 210,
          weight: 100,
          sex: 'masculine',
        })
        .expect(201)

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const response = await request(app.server)
        .post(`/users/invalid-uuid/plates`)
        .set('Cookie', cookies)
        .send({
          name: 'Salada de Frango Grelhado',
          description:
            'Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.',
          inDiet: true,
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          userId: ['Invalid user ID'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to create a plate if name is less than 2 characters long', async () => {
      const createUserResponse = await request(app.server)
        .post('/users')
        .send({
          name: 'mar alv',
          age: 30,
          height: 210,
          weight: 100,
          sex: 'masculine',
        })
        .expect(201)

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const response = await request(app.server)
        .post('/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates')
        .set('Cookie', cookies)
        .send({
          name: 'A',
          description:
            'Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.',
          inDiet: true,
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          name: ['Name must be at least 2 characters long'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to create a plate if inDiet is not specified', async () => {
      const createUserResponse = await request(app.server)
        .post('/users')
        .send({
          name: 'mar alv',
          age: 30,
          height: 210,
          weight: 100,
          sex: 'masculine',
        })
        .expect(201)

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const response = await request(app.server)
        .post('/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates')
        .set('Cookie', cookies)
        .send({
          name: 'Salada de Frango Grelhado',
          description:
            'Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.',
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          inDiet: ['Please specify if the plate is on a diet.'],
        },
        message: 'Invalid input',
      })
    })
  })
})
