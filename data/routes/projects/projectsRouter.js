const projectsDb = require('../projects/projectsModel')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
    try {
        const projects = await projectsDb.get()
        res.status(200).json(projects)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;