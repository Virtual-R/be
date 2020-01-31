const express = require('express')
const usersModel = require('./usersModel')
const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')
const bcrypt = require('bcryptjs')
const projectsRouter = require('../projects/projectsRouter')


const router = express.Router()
router.use('/:id/projects', projectsRouter)

router.post('/')