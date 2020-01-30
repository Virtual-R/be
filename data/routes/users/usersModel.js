const bcrypt = require('bcryptjs')
const db = require('../../config/dbConfig')

const get = () => {
    return db('users')
        .select('id', 'username')
}

const getBy = (filter) => {
    return db('users')
        .where(filter)
        .select('id', 'username')
}

const getById = (id) => {
    return db('users')
        .where({ id })
        .first('id', 'username')
}

const add = async (user) => {
    user.password = await bcrypt.hash(user.password, 12)
    const [id] = await db('users').insert(user)
    return getById(id)
}

const update = async (id, changes) => {
    await db('users')
        .where({id})
        .update(changes)
    return getById(id)
}

const remove = (id) => {
    return db('users')
        .where({ id })
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