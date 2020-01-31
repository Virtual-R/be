const request = require('supertest')
const server = require('../../api/server')
const db = require('../config/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})


//REGISTRATION
describe('auth router tests', () => {

    test('new user registered successfully', async () => {
        jest.setTimeout(10000)
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: "testuser5", password: "testpassword5"})
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
    })

    test('new user failed', async () => {
        jest.setTimeout(10000)
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: "testuser6", password: "" })
        expect(res.status).toBe(500)
        expect(res.body.message).toMatch(/missing required information/i)
    })


    //LOGIN
    test('successful login', async () => {
        jest.setTimeout(10000)
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'testuser1', password: 'testpassword1'})
        expect(res.status).toBe(200)
    })

    test('unsuccessful login', async () => {
        jest.setTimeout(10000)
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'testuser1', password: 'testpassword2'})
        expect(res.status).toBe(401)
        expect(res.body.message).toMatch(/invalid credentials/i)
    })
})