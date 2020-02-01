const db = require('../../config/dbConfig')
const projectsModel = require('./projectsModel')
const overviewModel = require('../overview/overviewModel')

beforeEach(async () => {
    await db.seed.run()
})

describe('project model functions', () => {

    test('get by function', async () => {
        const project = await projectsModel.getBy({title: "Aenigma"})
        expect(project.title).toBe('Aenigma')
    })

    test('get by id function', async () => {
        const project = await projectsModel.getById(1)
        expect(project.title).toMatch(/aenigma/i)
    })

    test('add function', async () => {
        await projectsModel.add({ 
            user_id: 2,
            title: "Portlandi-ish",
            description: "A story set in a weird, alternate universe where Portland, OR is full of hipsters and antique shops.",
            goal_amount: 20000,
            amount_received:282,
            funding_completed: false,
         })
         const projects = await db('projects').select()
         expect(projects.length).toBeGreaterThan(3)
    })

    test('update function', async () => {
        await projectsModel.update(1, {title: "Shabooga"})
        const project = await projectsModel.getById(1)
        expect(project.title).toMatch(/shabooga/i)
    })

    test('delete function', async () => {
        await projectsModel.remove(1)
        const projects = await overviewModel.get()
        expect(projects).toHaveLength(2)
    })
})