const router = require('express').Router()
const usersModel = require('../routes/users/usersModel')

const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const bcrypt = require('bcryptjs')

const { validateUser, validateUserId } = require('../middleware/validate')

router.post('/register', validateUser(), async (req, res, next) => {
    try {
        const { username, password } = req.body
        const newUser = 
            username && password
            ? await usersModel.add({ username, password})
            : res.status(500).json({ message: "Missing required information."})
        res.status(201).json(newUser)
    }
    catch (error) {
        next(error)
    }
})

router.post('/login', validateUserId(), async (req, res, next) => {
    const generateToken = (user) => {
        const payload = {
            subject: user.id,
            username: user.username,
        };

        const options = {
            expiresIn: '1d'
        };

        return jwt.sign(payload, secrets.jwt, options)
    }

    try {
        const { username, password } = req.body
        const user = await usersModel.getBy({username}).first()
        const passwordValid = await bcrypt.compare(req.body.password, user.password)

        if(!username || !password) {
            res.status(401).json({
                message: 'Invalid credentials.'
            })
        } else {
            if(user && passwordValid) {
                const token = generateToken(user)
    
                res.status(200).json({
                    message: `Welcome, ${user.username}.`,
                    token: token,
                })
            }
        }
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;