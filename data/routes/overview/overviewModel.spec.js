const db = require('../../config/dbConfig')
const overviewModel = require('./overviewModel')

beforeEach(async () => {
    await db.seed.run()
})

describe('overview model get function', () => {
    test('get function', async () => {
        const overview = await overviewModel.get()
        expect(overview.length).toBeGreaterThan(0)
    })
})