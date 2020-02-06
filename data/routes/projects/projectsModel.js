const db = require('../../config/dbConfig')

const get = () => {
    return db('projects')
        .select()
}

const getBy = (filter) => {
    return db('projects')
        .where(filter)
        .first()
    }

const getByUserId = async (id) => {
    const projects = await db('projects')
        .where('user_id', id)
        .select(
            'project_id', 
            'user_id', 
            'title', 
            'description', 
            'goal_amount', 
            'amount_received', 
            'funding_completed',
            )

    projects.map((project) => {
        return {...project, funding_completed: project.funding_completed === 1 ? true : false }
    })
    return {...projects}
}

const getById = async (id) => {
    const project = await db('projects')
        .where('project_id', id)
        .first()
        return project
}


const getByIds = async (userId, id) => {
    const project = await db('projects')
        .where({ 
            user_id: userId, 
            project_id: id })
        .first()
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

const update = (userId, id, changes) => {
    return db('projects')
        .where({ 
            user_id: userId, 
            project_id: id })
        .update(changes)
        .returning('*')
}

const remove = (project_id) => {
    return db('projects')
        .where({ project_id })
        .del()
}

module.exports = {
    get, 
    getBy,
    getByUserId,
    getById,
    getByIds, 
    add, 
    update, 
    remove
}