const request = require('supertest')
const server = require('../../../api/server')

let token;

beforeAll((done) => {
    request(server)
    .post('/api/auth/login')
    .send({
        username: 'testuser5',
        password: 'testpassword5'
    })
    .end((err, response) => {
        if(err) {
            console.log(err)
        } else {
            token = response.body.token; //gotta save the token
            console.log('this is my token', token)
                done();
            }

        })
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
            .set('authorization', token)
        console.log('get all users', res.body)
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

    test('get a single user', async () => {
        const res = await request(server)
            .get('/api/users/1')
            .set('authorization', token)
        console.log('get a single user', res.body)
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

    //need to figure out how to add the token to this request.
    test('update a user', async () => {
        const res = await request(server)
            .put('/api/users/1')
            .set('authorization', `${token}`)
            .send({ username: 'TestUserUno', password: 'TestPasswordUno' })
            expect(res.type).toBe('application/json')
            expect(res.status).toBe(201)
            expect(res.body).toBe({ username: 'TestUserUno', password: 'TestPasswordUno' })
    })

    //need to figure out how to add the token to this request.
    test('delete a user', async () => {
        const res = await request(server)
            .delete('/api/users/1')
            .set('authorization', `${token}`)
        expect(res.status).toBe(204)
    })
})