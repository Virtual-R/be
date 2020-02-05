const projectsModel = require('../projects/projectsModel')
const router = require('express').Router()
const authenticate = require('../../middleware/authenticate')
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

router.get('/:id', validateProjectId, async (req, res, next) => {
    try {
        const payload = await projectsModel.getById(req.params.id)
        res.status(200).json(payload)
    }
    catch (error) {
        next(error)
    }
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const project = await projectsModel.add(req.body)
        res.status(201).json(project)
    }
    catch (error) {
        next(error)
    }
})

router.put(':id', validateProject, authenticate, validateProjectId, async (req, res, next) => {
    const changes = {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        goal_amount: req.body.goal_amount,
        amount_received: req.body.amount_received,
        funding_completed: req.body.funding_completed,
    }
    try {
        const updates = await projectsModel.update(req.params.id, changes)
        res.status(200).json(updates)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/:id', authenticate, validateProjectId, async (req, res, next) => {
    try {
        const deletedProject = await projectsModel.remove(req.params.id)
        if(deletedProject > 0) {
            res.status(204).json({ message: 'Project was deleted.'})
        }
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;