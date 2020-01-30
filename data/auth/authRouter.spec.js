const request = require('supertest')
const server = require('../../api/server')
const db = require('../config/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})

describe('auth router tests', () => {
    test('new user registered successfully', async () => {
        jest.setTimeout(10000)
        const res = await request(server).post('/api/auth/register')
    })
})