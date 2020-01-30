const express = require('express')
const usersModel = require('./usersModel')
const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/')