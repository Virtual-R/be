const db = require('../../config/dbConfig')

const get = () => {
    return db('projects')
        .select()
}

module.exports = {
    get,
}