const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('../data/auth/authRouter')
const usersRouter = require('../data/routes/users/usersRouter')

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;