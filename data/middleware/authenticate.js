const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, secrets.jwt)

        req.userId = decoded.subject
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: 'Invalid credentials.'
        })
    }
}