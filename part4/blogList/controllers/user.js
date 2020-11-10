const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.post('/', async (request, response) => {
    const body = request.body
    if(body.password.length < 3) return response.status(400).json({ error: 'password is too short' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        name: body.name,
        username: body.username,
        passwordHash
    })

    const savedUser = await newUser.save()
    response.json(savedUser)
})

module.exports = userRouter
