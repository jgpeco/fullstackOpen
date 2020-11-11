const mongoose = require('mongoose')
const helper = require('./bloglist_testHelper')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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
        const response = await helper.blogsInDb()
        const blogToCheck = response[0]

        expect(blogToCheck.id).toBeDefined()
    })
})

describe('POST /api/blogs', () => {
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

        const blogs = await helper.blogsInDb()
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

        const blogsAfterPost = await helper.blogsInDb()
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

        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
     })
})

describe('DELETE /api/blogs/:id', () => {
    test('delete resource when valid ID is passed', async () => {
        const allBlogs = await helper.blogsInDb()
        const blogToRemove = allBlogs[0]

        await api
            .delete(`/api/blogs/${blogToRemove.id}`)
            .expect(204)

        const blogsAfterRemoval = await helper.blogsInDb()
        expect(blogsAfterRemoval).toHaveLength(helper.initialBlogs.length - 1)

        const blogAuthors = blogsAfterRemoval.map(b => b.author)
        expect(blogAuthors).not.toContain('Peco')
    })
})

describe('PUT /api/blogs/:id', () => {
    test('when the user pass valid data to update', async () => {
        const allBlogs = await helper.blogsInDb()
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

        const allBlogsAfterUpdate = await helper.blogsInDb()
        expect(allBlogsAfterUpdate).toHaveLength(helper.initialBlogs.length)
    })
})

describe('User Management', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const defaultUser = new User({ username: 'root', passwordHash })
        await defaultUser.save()
    })
    describe('User Creation', () => {
        test('Create user with valid data. POST /api/users', async () => {
            const allUsers = await helper.usersInDb()

            const newUser = {
                username: 'peco',
                password: 'password'
            }

            const userRequest = await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            expect(userRequest.body.username).toMatch('peco')

            const allUsersPostRequest = await helper.usersInDb()
            expect(allUsersPostRequest).toHaveLength(allUsers.length + 1)

            const allUsernamesInDb = allUsersPostRequest.map(u => u.username)
            expect(allUsernamesInDb).toContain('peco')
        })

        test('With invalid password, do not create new user. POST /api/users', async () => {
            const allUsers = await helper.usersInDb()

            const invalidNewUser = {
                name: 'Peco Testandus',
                username: 'peco',
                password: 'oi'
            }

            const errorUser = await api
                .post('/api/users')
                .send(invalidNewUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(errorUser.body.error).toMatch('password is too short')

            const usersinDbAfterRequest = await helper.usersInDb()
            expect(usersinDbAfterRequest).toHaveLength(allUsers.length)
        })

        test('With invalid username, do not create a new user. POST /api/users', async () => {
            const invalidNewUser = {
                name: 'Peco Testandus',
                password: 'senha'
            }

            const errorUser = await api
                .post('/api/users')
                .send(invalidNewUser)
                .expect(400)
            expect(errorUser.body.error).toMatch('`username` is required')
        })

        test('With a username that already exists, do not create a new user. POST /api/users', async () => {
            const allUsersInDb = await helper.usersInDb()

            const invalidNewUser = {
                username: 'root',
                password: 'secret'
            }

            const errorUser = await api
                .post('/api/users')
                .send(invalidNewUser)
                .expect(400)
            expect(errorUser.body.error).toMatch('expected `username` to be unique')

            const allUsersInDbAfterRequest = await helper.usersInDb()
            expect(allUsersInDbAfterRequest).toHaveLength(allUsersInDb.length)
        })
    })


    describe('User Authentication', () => {
        test('User with valid credentials should log in and receive a token', async () => {
            const userToLogin = {
                username: 'root',
                password: 'sekret'
            }

            const loggedUser = await api
                .post('/api/login')
                .send(userToLogin)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            expect(loggedUser.body.token).toBeDefined()

            const allUsersInDb = await helper.usersInDb()
            const user = allUsersInDb[0]
            expect(user.username).toEqual(loggedUser.body.username)
        })

        test('User with invalid credentials should not log in', async () => {
            const invalidUser = {
                username: 'root',
                password: 'secret'
            }

            const loggedUser = await api
                .post('/api/login')
                .send(invalidUser)
                .expect(401)
                .expect('Content-Type', /application\/json/)
            expect(loggedUser.body.error).toMatch('invalid password')

        })
    })

})



afterAll(() => {
    mongoose.connection.close()
})