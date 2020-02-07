const router = require('express').Router()
const usersModel = require('../users/usersModel')

const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')
const bcrypt = require('bcryptjs')

const { validateUser, validateUserId } = require('../../middleware/validate')

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body

        //this will be handled by the validate middleware eventually.
        if(!username || !password) {
            res.status(400).json({ message: "Missing required data."})
        } else {
            const newUser = username && password 
                await usersModel.add({ username, password })
                res.status(201).json(newUser)
        }
    }
    catch (error) {
        next(error)
    }
})

//async operation
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
        const { username, password } = req.body;
        // console.log('username', username)
        // console.log('password', password)
        const user = await usersModel.getBy({ username })/*.first()*/
        const passwordValid = await bcrypt.compare(password, user.password)
        
        if(user && passwordValid) {
            const token = generateToken(user)
            const id = user.id
            const username = user.username
            res.status(200).json({
                message: `Welcome, ${username}.`,
                username,
                id,
                token,
            })
        } else if (!user || !passwordValid) { 
            res.status(401).json({
                message: 'Invalid credentials.'
            })
        }
    }
    catch (error) {
        // console.log(error)
        next(error)
    }
})


module.exports = router;