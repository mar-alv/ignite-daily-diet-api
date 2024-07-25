import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'child_process'
import request from 'supertest'
import { z } from 'zod'

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

  describe.skip('create plate tests', () => {
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
          name: 'Grilled Chicken Salad',
          description:
            'A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.',
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
            'A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.',
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
          name: 'Grilled Chicken Salad',
          description:
            'A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.',
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          inDiet: ['Please specify if the plate is on a diet.'],
        },
        message: 'Invalid input',
      })
    })

    it('should be able to create a plate', async () => {
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

      const userId = createUserResponse.body.userId

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const plateData = {
        name: 'Salada de Frango Grelhado',
        description:
          'Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.',
        inDiet: true,
      }

      const createPlateResponse = await request(app.server)
        .post(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .send(plateData)
        .expect(201)

      const createPlateResponseSchema = z.object({
        plateId: z.string().uuid(),
      })

      expect(() =>
        createPlateResponseSchema.parse(createPlateResponse.body),
      ).not.toThrow()
    })
  })

  describe.skip('get plates tests', () => {
    it('should not be able to get plates if sessionId is not present in the cookies', async () => {
      const response = await request(app.server)
        .get('/users/some-user-id/plates')
        .expect(401)

      expect(response.body).toEqual({
        error: 'Unauthorized',
      })
    })

    it('should not be able to get plates if userId is not a valid UUID', async () => {
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .get('/users/invalid-uuid/plates')
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        errors: {
          userId: ['Invalid user ID'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to get plates if the user does not exist', async () => {
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .get('/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates')
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        error: 'User not found',
      })
    })

    it('should be able to get plates if the user exists and has plates', async () => {
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

      const userId = createUserResponse.body.userId

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const plateData1 = {
        name: 'Salada de Frango Grelhado',
        description:
          'Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.',
        inDiet: true,
      }

      const plateData2 = {
        name: 'Bife com Batatas',
        description: 'Bife suculento com batatas assadas.',
        inDiet: false,
      }

      await request(app.server)
        .post(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .send(plateData1)
        .expect(201)

      await request(app.server)
        .post(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .send(plateData2)
        .expect(201)

      const getPlatesResponse = await request(app.server)
        .get(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .expect(200)

      expect(getPlatesResponse.body).toEqual({
        plates: [
          {
            id: expect.any(String),
            name: plateData1.name,
            description: plateData1.description,
            inDiet: plateData1.inDiet,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          {
            id: expect.any(String),
            name: plateData2.name,
            description: plateData2.description,
            inDiet: plateData2.inDiet,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        ],
      })
    })

    it('should be able to get an empty list of plates if the user exists but has no plates', async () => {
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

      const userId = createUserResponse.body.userId

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const getPlatesResponse = await request(app.server)
        .get(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .expect(200)

      expect(getPlatesResponse.body).toEqual({
        plates: [],
      })
    })
  })

  describe.skip('get plate tests', () => {
    it('should not be able to get a plate if sessionId is not present in the cookies', async () => {
      const response = await request(app.server)
        .get('/users/some-user-id/plates')
        .expect(401)

      expect(response.body).toEqual({
        error: 'Unauthorized',
      })
    })

    it('should not be able to get a plate if userId is not a valid UUID', async () => {
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .get('/users/invalid-uuid/plates')
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        errors: {
          userId: ['Invalid user ID'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to get a plate if plateId is not a valid UUID', async () => {
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .get('/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates/invalid-uuid')
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        errors: {
          plateId: ['Invalid plate ID'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to get a plate if the user does not exists', async () => {
      const userId = '835fc927-94e8-4bda-be46-db2f12dca0f9'
      const plateId = 'dd2786d7-c0e7-4dd1-a435-100728774102'
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .get(`/users/${userId}/plates/${plateId}`)
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        error: 'User not found',
      })
    })

    it('should not be able to get a plate if the plate does not exists', async () => {
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

      const userId = createUserResponse.body.userId
      const plateId = 'dd2786d7-c0e7-4dd1-a435-100728774102'

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const response = await request(app.server)
        .get(`/users/${userId}/plates/${plateId}`)
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        error: 'Plate not found',
      })
    })

    it('should be able to get a plate', async () => {
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

      const userId = createUserResponse.body.userId

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const plateData = {
        name: 'Salada de Frango Grelhado',
        description:
          'Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.',
        inDiet: true,
      }

      const createPlateResponse = await request(app.server)
        .post(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .send(plateData)
        .expect(201)

      const plateId = createPlateResponse.body.plateId

      const getPlateRresponse = await request(app.server)
        .get(`/users/${userId}/plates/${plateId}`)
        .set('Cookie', cookies)
        .expect(200)

      expect(getPlateRresponse.body).toEqual({
        plate: {
          id: plateId,
          name: plateData.name,
          description: plateData.description,
          inDiet: plateData.inDiet,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      })
    })
  })

  describe('delete plate tests', () => {
    it('should not be able to delete a plate if sessionId is not present in the cookies', async () => {
      const response = await request(app.server)
        .delete('/users/some-user-id/plates/some-plate-id')
        .expect(401)

      expect(response.body).toEqual({
        error: 'Unauthorized',
      })
    })

    it('should not be able to delete a plate if userId is not a valid UUID', async () => {
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .delete(
          '/users/invalid-uuid/plates/dd2786d7-c0e7-4dd1-a435-100728774102',
        )
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        errors: {
          userId: ['Invalid user ID'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to delete a plate if plateId is not a valid UUID', async () => {
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .delete(
          '/users/dd2786d7-c0e7-4dd1-a435-100728774102/plates/invalid-uuid',
        )
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        errors: {
          plateId: ['Invalid plate ID'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to delete a plate if the user does not exist', async () => {
      const userId = '835fc927-94e8-4bda-be46-db2f12dca0f9'
      const plateId = 'dd2786d7-c0e7-4dd1-a435-100728774102'
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .delete(`/users/${userId}/plates/${plateId}`)
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        error: 'User not found',
      })
    })

    it('should not be able to delete a plate if the plate does not exist', async () => {
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

      const userId = createUserResponse.body.userId
      const plateId = 'dd2786d7-c0e7-4dd1-a435-100728774102'
      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const response = await request(app.server)
        .delete(`/users/${userId}/plates/${plateId}`)
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        error: 'Plate not found',
      })
    })

    it('should be able to delete a plate', async () => {
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

      const userId = createUserResponse.body.userId
      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const plateData = {
        name: 'Grilled Chicken Salad',
        description:
          'A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.',
        inDiet: true,
      }

      const createPlateResponse = await request(app.server)
        .post(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .send(plateData)
        .expect(201)

      const plateId = createPlateResponse.body.plateId

      await request(app.server)
        .delete(`/users/${userId}/plates/${plateId}`)
        .set('Cookie', cookies)
        .expect(204)
    })
  })
})
