const express = require('express')
const usersModel = require('./usersModel')
const projectsRouter = require('../projects/projectsRouter')
const authenticate = require('../../middleware/authenticate')


const router = express.Router()

router.use('/:id/projects', projectsRouter)

router.get('/', async (req, res, next) => {
    try {
        const users = await usersModel.get()
        res.status(200).json(users)
    }
    catch (error) {
        next(error)
    }
})

router.get('/:id', authenticate(), async (req, res, next) => {
    try { 
        const payload = await usersModel.getById(req.params.id)
        res.status(200).json(payload)
    }
    catch (error) {
        next(error)
    }
})

//no need to authenticate here because we have to add a user.
router.post('/', async (req, res, next) => {
    try {
        const user = await usersModel.add(req.body)
        res.status(201).json(user)
    }
    catch (error) {
        next(error)
    }
})

router.put('/:id', authenticate(), async (req, res, next) => {
    const changes = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const updates = await usersModel.update(req.params.id, changes)
        res.status(200).json(updates)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/:id', authenticate(), async (req, res, next) => {
    try {
        const deletedUser = await usersModel.remove(req.params.id)

        if(deletedUser > 0) {
            res.status(204).json({ message: 'User was deleted.'})
        }
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;