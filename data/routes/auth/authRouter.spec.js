const request = require('supertest')
const server = require('../../../api/server')
const db = require('../../config/dbConfig')


beforeAll(async () => {
    console.log('called!')
    await db('users').truncate()    
})

//REGISTRATION
describe('auth router tests', () => {

    test('new user registered successfully', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: "testuser5", password: "testpassword5"})
            // console.log(res.body)
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
    })

    test('new user failed', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: "testuser6", password: "" })
        expect(res.status).toBe(400)
        expect(res.body.message).toMatch(/missing required data/i)
        expect(res.type).toBe('application/json')
    })

    //LOGIN
    test('successful login', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'testuser5', password: 'testpassword5'})
            console.log('successful login', res.body)
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

    test('unsuccessful login', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'testuser5', password: 'testpassword6'})
            console.log('unsuccessful login', res.body)
        expect(res.status).toBe(401)
    })
})