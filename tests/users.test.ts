import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'child_process'
import request from 'supertest'

import { app } from '../src/app'

describe('users routes', () => {
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

  describe('create user tests', () => {
    it('should not be able to create an user if name is less than 3 characters long', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'Jo',
          age: 20,
          height: 160,
          weight: 60,
          sex: 'masculine',
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          name: ['Name must be at least 3 characters long'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to create an user if age is less than 12', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'John',
          age: 10,
          height: 160,
          weight: 60,
          sex: 'masculine',
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          age: ['Age must be at least 12 years old'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to create an user if height is less than 130 cm', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'John',
          age: 20,
          height: 120,
          weight: 60,
          sex: 'masculine',
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          height: ['Height must be at least 130 cm'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to create an user if weight is less than 30 kg', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'John',
          age: 20,
          height: 160,
          weight: 25,
          sex: 'masculine',
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          weight: ['Weight must be at least 30 kg'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to create an user if sex is not "masculine" or "feminine"', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'John',
          age: 20,
          height: 160,
          weight: 60,
          sex: 'other',
        })
        .expect(400)

      expect(JSON.parse(response.text)).toEqual({
        errors: {
          sex: ['Please select either "masculine" or "feminine" as your sex'],
        },
        message: 'Invalid input',
      })
    })

    it('should be able to create a new user', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'mar alv',
          age: 30,
          height: 210,
          weight: 100,
          sex: 'masculine',
        })
        .expect(201)

      expect(response.body.userId).toBeTruthy()
    })
  })

  describe('get user tests', () => {
    it('should not be able to get an user if sessionId is not present in the cookies', async () => {
      const createUserResponse = await request(app.server).post('/users').send({
        name: 'mar alv',
        age: 30,
        height: 210,
        weight: 100,
        sex: 'masculine',
      })

      const userId = createUserResponse.body.userId

      const response = await request(app.server)
        .get(`/users/${userId}`)
        .set('Cookie', [''])
        .expect(401)

      expect(JSON.parse(response.text)).toEqual({
        error: 'Unauthorized',
      })
    })

    it('should not be able to get an user if userId is invalid', async () => {
      const createUserRequest = {
        name: 'mar alv',
        age: 30,
        height: 210,
        weight: 100,
        sex: 'masculine',
      }

      const createUserResponse = await request(app.server)
        .post('/users')
        .send(createUserRequest)

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const getUserResponse = await request(app.server)
        .get('/users/094d5eda-730f-41db-b220-31a00b6825ef')
        .set('Cookie', cookies)
        .expect(404)

      expect(JSON.parse(getUserResponse.text)).toEqual({
        error: 'User not found',
      })
    })

    it('should be able to get an user', async () => {
      const createUserRequest = {
        name: 'mar alv',
        age: 30,
        height: 210,
        weight: 100,
        sex: 'masculine',
      }

      const createUserResponse = await request(app.server)
        .post('/users')
        .send(createUserRequest)

      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const userId = createUserResponse.body.userId

      const getUserResponse = await request(app.server)
        .get(`/users/${userId}`)
        .set('Cookie', cookies)
        .expect(200)

      expect(getUserResponse.body.user).toEqual(
        expect.objectContaining({
          name: createUserRequest.name,
          age: createUserRequest.age,
          height: createUserRequest.height,
          weight: createUserRequest.weight,
          sex: createUserRequest.sex,
        }),
      )
    })
  })

  describe('get user metrics', () => {
    it('should not be able to get metrics if sessionId is not present in the cookies', async () => {
      const response = await request(app.server)
        .get('/users/some-user-id/metrics')
        .expect(401)

      expect(response.body).toEqual({
        error: 'Unauthorized',
      })
    })

    it('should not be able to get metrics if userId is not a valid UUID', async () => {
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .get('/users/invalid-uuid/metrics')
        .set('Cookie', cookies)
        .expect(400)

      expect(response.body).toEqual({
        errors: {
          id: ['Invalid user ID'],
        },
        message: 'Invalid input',
      })
    })

    it('should not be able to get metrics if the user does not exist', async () => {
      const userId = '835fc927-94e8-4bda-be46-db2f12dca0f9'
      const cookies = ['sessionId=valid-session-id']

      const response = await request(app.server)
        .get(`/users/${userId}/metrics`)
        .set('Cookie', cookies)
        .expect(404)

      expect(response.body).toEqual({
        error: 'User not found',
      })
    })

    it('should return metrics for a user with plates', async () => {
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

      await request(app.server)
        .post(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .send({
          name: 'Chicken Salad',
          description: 'Healthy salad with grilled chicken.',
          inDiet: true,
        })
        .expect(201)

      await request(app.server)
        .post(`/users/${userId}/plates`)
        .set('Cookie', cookies)
        .send({
          name: 'Pizza',
          description: 'Delicious cheese pizza.',
          inDiet: false,
        })
        .expect(201)

      const response = await request(app.server)
        .get(`/users/${userId}/metrics`)
        .set('Cookie', cookies)
        .expect(200)

      expect(response.body).toEqual({
        bestDietSequence: 1,
        platesAmount: 2,
        platesOnDiet: 1,
        platesOutOfDiet: 1,
      })
    })

    it('should return metrics for a user with no plates', async () => {
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

      console.log(createUserResponse.get('Set-Cookie'))

      const userId = createUserResponse.body.userId
      const cookies = createUserResponse.get('Set-Cookie') ?? ['']

      const response = await request(app.server)
        .get(`/users/${userId}/metrics`)
        .set('Cookie', cookies)
        .expect(200)

      expect(response.body).toEqual({
        bestDietSequence: 0,
        platesAmount: 0,
        platesOnDiet: 0,
        platesOutOfDiet: 0,
      })
    })
  })
})
