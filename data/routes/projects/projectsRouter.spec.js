// const request = require('supertest')
// const server = require('../../../api/server')
// const db = require('../../config/dbConfig')

// // beforeEach(async () => {
// //     await db.seed.run()
// // })

// describe('projects router tests', () => {

//     test('get all projects for a user', async () => {
//         jest.setTimeout(10000)
//         const res = await request(server).get('/api/users/1/projects')
//         expect(res.status).toBe(200)
//         expect(res.type).toBe('application/json')
//     })

//     test('get a specific project', async () => {
//         jest.setTimeout(10000)
//         const res = await request(server).get('/api/users/1/projects/1')
//         expect(res.status).toBe(200)
//         expect(res.type).toBe('application/json')
//     })

//     test('create a new project', async () => {
//         jest.setTimeout(10000)
//         const payload = {
//             user_id: 1,
//             title: "Dogs, dogs, dogs!",
//             description: "So many dogs! We love dogs. You can pet them.",
//             goal_amount: 10000,
//             amount_received: 1000,
//             funding_completed: false,
//         }
//         const res = await request(server)
//         .post('/api/users/1/projects/')
//         .send(payload)
//         expect(res.status).toBe(201)
//         expect(res.type).toBe('application/json')
//     })
// })