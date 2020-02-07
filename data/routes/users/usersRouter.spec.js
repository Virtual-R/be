const request = require('supertest')
const server = require('../../../api/server')
const db = require('../../config/dbConfig')

const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')



beforeAll(() => {
    const generateToken = (user) => {
        const payload = {
            subject: user.id,
            username: user.username
        }
        const options = {
            expiresIn: '1d'
        }
        return jwt.sign(payload, secrets.jwt, options)
    }
    token = generateToken({ id: 1, username: 'testuser1' })
})

describe('users router tests', () => {
    test('get all users failure - no token', async () => {
        const res = await request(server).get('/api/users')
        expect(res.status).toBe(401)
        expect(res.type).toBe('application/json')

    })

    //this test requires a token. Figure out how to get a token into a test environment.
    test('get all users - success', async () => {
        const res = await request(server)
            .get('/api/users')
            .set({ Authorization: token})
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

    test('get a single user', async () => {
        const res = await request(server)
            .get('/api/users/1')
            .set({ Authorization: token})
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

    //need to figure out how to add the token to this request.
    test('update a user', async () => {
        const res = await request(server)
            .put('/api/users/1')
            .set({ Authorization: token})
            .send({ username: 'TestUserFive', password: 'TestPasswordFive' })
        expect(res.type).toBe('application/json')
        expect(res.status).toBe(200)
    })

    //need to figure out how to add the token to this request.
    test('delete a user', async () => {
        const res = await request(server)
            .delete('/api/users/1')
            .set({ Authorization: token})
        expect(res.status).toBe(204)
    })
})