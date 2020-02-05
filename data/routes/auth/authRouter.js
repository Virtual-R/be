const router = require('express').Router()
const usersModel = require('../users/usersModel')

const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')
const bcrypt = require('bcryptjs')

const { validateUser, validateUserId } = require('../../middleware/validate')

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

//async operation
router.post('/login', /*validateUser(), validateUserId(),*/ async (req, res, next) => {
    console.log(req.body)
    try {
        const { username, password } = req.body;
        console.log('show me the username', username)
        console.log('show me the password', password)
        const user = await usersModel.getBy({ username })
        const passwordValid = await bcrypt.compare(password, user.password)
        console.log('password valid?', passwordValid)
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
        console.log('user and password', user, passwordValid)
            if(user && passwordValid) {
                const token = generateToken(user)
                console.log(token)
                res.status(200).json({
                    message: `Welcome, ${user.username}.`,
                    token: token,
                })
            } else if (!user || !passwordValid) { 
                res.status(401).json({
                    message: 'Invalid credentials.'
                })
        }
    }
    catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router;