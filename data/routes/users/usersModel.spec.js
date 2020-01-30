const db = require('../../config/dbConfig')
const usersModel = require('./usersModel')

//re-run seeds prior to every test.

beforeEach(async () => {
    await db.seed.run()
})

//These are unit tests. These are to test the functions in isolation to make sure they work.
describe('user model functions', () => {

    //list of all users
    test('get function', async () => {
        const users = await usersModel.get()
        expect(users.length).toBeGreaterThan(0)
    })

    test('get by function', async () => {
        const user = await usersModel.getBy({ username: "testuser1" })
        expect(user.username).toMatch(/testuser1/i)
    })

    test('get by id function', async () => {
        const user = await usersModel.getById(1)
        expect(user.username).toMatch(/testuser1/i)
    })

    test('add function', async () => {
        await usersModel.add({ username: 'testusername2', password: 'testpassword2' })
        const users = await db('users').select()
        expect(users).toHaveLength(2)
    })

    test('update function', async () => {
        await usersModel.update(1, {username: "testusername12"})
        const user = await db('users').getById(1)
        expect(user.username).toMatch(/testusername12/i)
    })

    test('remove function', async () => {
        await usersModel.remove(1)
        const users = await usersModel.get()
        expect(users).toHaveLength(1)
    })
})