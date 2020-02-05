const request = require('supertest')
const server = require('../../../api/server')
const db = require('../../config/dbConfig')

beforeAll(async () => {
    console.log('called from usersRouter!')
    await db('users').truncate()
})

//we need to define a token variable in the global scope so the tests have access to it.
let token; 

//before any tests are run, we run this block. We pass in a user that we know is in the db and get a token back. then we call done() to break out of the block. 
beforeEach(async (done) => {
    const userLogin = await request(server)
        .post('/api/auth/login')
        .send({ 
            username: 'testuser1',
            password: 'testpassword1' 
        })
        token = userLogin.body.token
})

describe('users router tests', () => {
    test('get all users failure - no token', async () => {
        const res = await request(server).get('/api/users')
        expect(res.status).toBe(401)
    })

    //this test requires a token. Figure out how to get a token into a test environment.
    test('get all users - success', async () => {
        console.log('token in test scope', token)
        const res = await request(server)
            .get('/api/users')
            .set("Authorization", token)
        console.log('get all users', res.body)
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

    test('get a single user', async () => {
        const res = await request(server)
            .get('/api/users/1')
            .set("Authorization", token)
        console.log('get a single user', res.body)
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

    //need to figure out how to add the token to this request.
    test('update a user', async () => {
        const res = await request(server)
            .put('/api/users/1')
            .set("Authorization", token)
            .send({ username: 'TestUserFive', password: 'TestPasswordFive' })
            expect(res.type).toBe('application/json')
            expect(res.status).toBe(201)
            expect(res.body).toBe({ username: 'TestUserFive', password: 'TestPasswordFive' })
    })

    //need to figure out how to add the token to this request.
    test('delete a user', async () => {
        console.log('token', token)
        const res = await request(server)
            .delete('/api/users/1')
            .set("Authorization", token)
        expect(res.status).toBe(204)
    })
})