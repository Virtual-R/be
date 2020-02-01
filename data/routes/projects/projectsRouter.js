const projectsModel = require('../projects/projectsModel')
const overview = require('../overview/overviewModel')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
    try {
        console.log(req.params.id)
        const projects = await projectsModel.getById(req.params.id)
        res.status(200).json(projects)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;