const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./bloglist_testHelper')


beforeEach(async () => {
    await Blog.deleteMany({})

    let newBlog = new Blog(helper.initialBlogs[0])
    await newBlog.save()
    newBlog = new Blog(helper.initialBlogs[1])
    await newBlog.save()
})

describe('GET /api/blogs', () => {
    test('returns json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })

    test('returns the correct amount of blog posts', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the blog posts have a id property', async () => {
        const response = await helper.blogsInDB()
        const blogToCheck = response[0]

        expect(blogToCheck.id).toBeDefined()
    })
})

describe('POST /api/posts', () => {
    test('creates a new blog', async () => {
        const newBlog = {
            title: `Tobias's Blog`,
            author: `Tobias`,
            url: `http://www.facebook.com`,
            likes: 5,
            id: `5fa596ccc40ae033681014e2`,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

        const blogAuthors = blogs.map(blog => blog.author)
        expect(blogAuthors).toContain(
            'Tobias'
        )
    })

    test('if the property likes was not sent, it will be 0', async () => {
        const newBlog = {
            title: `Tobias's Blog`,
            author: `Tobias`,
            url: `http://www.facebook.com`,
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDB()
        expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

        const blogWithoutLikes = blogsAfterPost.find(blog => blog.author === newBlog.author)
        expect(blogWithoutLikes.likes).toBe(0)

    })

    test('if there is no title or url, the blog is not added', async () => {
        const newBlog = {
            author: `Tobias`,
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDB()
        expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
     })
})

afterAll(() => {
    mongoose.connection.close()
})