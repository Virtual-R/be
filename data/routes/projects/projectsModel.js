const db = require('../../config/dbConfig')

const get = () => {
    return db('projects')
        .select()
}

const getBy = (filter) => {
    return db('projects')
        .where(filter)
        .select(['project_id', 'user_id', 'title', 'description', 'goal_amount', 'amount_received', 'funding_completed'])
}

const getById = async (id) => {
    const project = await db('projects').where({ id })
        .first('project_id', 'user_id', 'title', 'description', 'goal_amount', 'amount_received', 'funding_completed')
        return project
}
const add = async (project) => {
    const [id] = await db('projects').insert(project)
    return getById(id)
}

const update = async (id, changes) => {
    await db('projects')
        .where({ id })
        .update(changes)

        return getById(id)
}

const remove = (id) => {
    return db('projects')
        .where({ id })
        .del()
}