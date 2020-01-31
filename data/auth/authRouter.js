const router = require('express').Router()
const usersModel = require('../routes/users/usersModel')

const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {
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

router.post('/login', async (req, res, next) => {
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
        console.log(user)
        const passwordValid = await bcrypt.compare(password, user.password)

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