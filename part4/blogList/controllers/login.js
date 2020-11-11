const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })

    const correctPassword = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && correctPassword)){
        return response.status(401).json({ error: 'invalid password or username' })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
