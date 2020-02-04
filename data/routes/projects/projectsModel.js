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

const getById = async (project_id) => {
    const project = await db('projects').where({ project_id })
        .first('project_id', 'user_id', 'title', 'description', 'goal_amount', 'amount_received', 'funding_completed')
        return project
}

// const add = async (project) => {
//     const [id] = await db('projects').insert(project)
//     return getById(id)
// }

//apparently this is how it would need to be set up for the migration to postgres?
const add = (project) => {
    return db('projects')
        .insert(project)
        .returning('*')
}

// const update = async (project_id, changes) => {
//     await db('projects')
//         .where({ project_id })
//         .update(changes)

//         return getById(project_id)
// }

const remove = (project_id) => {
    return db('projects')
        .where({ project_id })
        .del()
}

module.exports = {
    get, 
    getBy, 
    getById, 
    add, 
    update, 
    remove
}