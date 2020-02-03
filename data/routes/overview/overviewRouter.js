const router = require('express').Router()
const projectsModel = require('../projects/projectsModel')

router.get('/', async (req, res, next) => {
    try {
        const overview = await projectsModel.get()
        res.status(200).json(overview)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;