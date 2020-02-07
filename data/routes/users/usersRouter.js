const express = require('express')
const usersModel = require('./usersModel')
const projectsRouter = require('../projects/projectsRouter')
const authenticate = require('../../middleware/authenticate')
const { validateUser, validateUserId } = require('../../middleware/validate')
const router = express.Router()

router.use('/:userId/projects', projectsRouter)

router.get('/', authenticate, async (req, res, next) => {
    try {
        const users = await usersModel.get()
        res.status(200).json(users)
    }
    catch (error) {
        next(error)
    }
})

router.get('/:userId', authenticate, async (req, res, next) => {
    try { 
        const payload = await usersModel.getById(req.params.userId)
        res.status(200).json(payload)
    }
    catch (error) {
        next(error)
    }
})

//no need to authenticate here because we have to add a user.

//duplicate functionality - this is handled in the auth router.
// router.post('/', validateUser(), async (req, res, next) => {
//     try {
//         const user = await usersModel.add(req.body)
//         res.status(201).json(user)
//     }
//     catch (error) {
//         next(error)
//     }
// })

router.put('/:userId', authenticate, async (req, res, next) => {
    const changes = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const updates = await usersModel.update(req.params.userId, changes)
        res.status(200).json(updates)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/:userId', authenticate, async (req, res, next) => {
    try {
        console.log('delete function id', req.params.userId)
        const deletedUser = await usersModel.remove(req.params.userId)

        if(deletedUser > 0) {
            res.status(204).json(deletedUser)
        } else if (deletedUser === 0) {
            res.status(500).json({message: "User could not be deleted."})
        }
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;