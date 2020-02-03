const projectsModel = require('../projects/projectsModel')
const router = require('express').Router()
const { validateProject, validateProjectId } = require('../../middleware/validate')

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

router.get('/:id', validateProjectId(), async (req, res, next) => {

})

module.exports = router;