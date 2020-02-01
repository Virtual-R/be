const router = require('express').Router()
const overviewModel = require('./overviewModel')

router.get('/', async (req, res, next) => {
    try {
        const overview = await overviewModel.get()
        res.status(200).json(overview)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;