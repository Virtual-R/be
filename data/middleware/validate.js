const users = require('../routes/users/usersModel')
const projects = require('../routes/projects/projectsModel')

const validateUserId = () => async (req, res, next) => {
    const userId = await users.getById(req.params.id)
    if(!userId) {
        return res.status(400).json({ message: 'Invalid user id.'})
    }
    req.user = userId
    next()
}

const validateUser = () => async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Missing required data.'})
    } else if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Missing required data - username and/or password"})
    }
    next()
}

const validateProject = () => async (req, res, next) => {
    if (!req.body) { 
        return res
            .status(400)
            .json({ message: "Missing required data. "})
    } else if (!req.body.user_id || !req.body.title) {
        return res
            .status(400)
            .json({ message: "Please fill out all required fields."})
    }
    next()
}

const validateProjectId = () => async (req, res, next) => {
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
