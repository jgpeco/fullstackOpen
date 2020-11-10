const mongoose = require('mongoose')
const helper = require('./bloglist_testHelper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs){
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
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

describe('DELETE /api/blogs/:id', () => {
    test('delete resource when valid ID is passed', async () => {
        const allBlogs = await helper.blogsInDB()
        const blogToRemove = allBlogs[0]

        await api
            .delete(`/api/blogs/${blogToRemove.id}`)
            .expect(204)

        const blogsAfterRemoval = await helper.blogsInDB()
        expect(blogsAfterRemoval).toHaveLength(helper.initialBlogs.length - 1)

        const blogAuthors = blogsAfterRemoval.map(b => b.author)
        expect(blogAuthors).not.toContain('Peco')
    })
})

describe('PUT /api/blogs/:id', () => {
    test('when the user pass valid data to update', async () => {
        const allBlogs = await helper.blogsInDB()
        const blogToUpdate = allBlogs[0]

        const newInfo = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 1
        }

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newInfo)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1)

        const allBlogsAfterUpdate = await helper.blogsInDB()
        expect(allBlogsAfterUpdate).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})