const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { name: 1, username: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = request.body
    const token = request.token
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return response.status(401).json({ error: 'missing or invalid token' })
    }
    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes || 0,
        user: user._id
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const blogToDelete = await Blog.findById(request.params.id)

    if((!token || !decodedToken.id) || (blogToDelete.user.toString() !== decodedToken.id)){
        return response.status(401).json({ error: 'missing or invalid token' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const updateInfo = request.body

    const newBlog = await Blog.findByIdAndUpdate(request.params.id, updateInfo, { new: true })
    response.json(newBlog)
})

module.exports = blogRouter