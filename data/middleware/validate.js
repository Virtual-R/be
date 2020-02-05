const users = require('../routes/users/usersModel')
const projects = require('../routes/projects/projectsModel')

const validateUserId = async (req, res, next) => {
    const userId = await users.getById(req.params.id)
    if(!userId) {
        return res
            .status(400)
            .json({ message: 'Invalid user id.'})
    }
    req.user = userId
    console.log('userId - ', userId)
    next()
}

const validateUser = async (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ message: 'Missing required data.'})
    } else {
        next()
    }
}

const validateProject = async (req, res, next) => {
    if (!req.body || !req.body.userId || !req.body.title) { 
        return res
            .status(400)
            .json({ message: "Missing required data. "})
    } else {
        next()
    }
}

const validateProjectId = async (req, res, next) => {
    const userId = await users.getById(req.params.id)
    const projectId = await projects.getById(req.params.project_id)

    if (!userId) {
        return res.status(400).json({message: "Invalid user id."})
    } else if (!projectId) {
        return res.status(400).json({message: "Invalid project id."})
    }
    req.project = projectId
    next()
}

module.exports = { 
    validateUser,
    validateUserId,
    validateProject,
    validateProjectId
}
