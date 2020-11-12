const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
    const result = await User
        .find({})
        .populate('blogs', { title: 1, url: 1, likes: 1 })
    response.json(result)
})

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
    response.status(201).json(savedUser)
})

module.exports = userRouter
