const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app) //superagent object of the express server
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const Note = require('../models/note')
const User = require('../models/user')

beforeEach(async () => {
    await Note.deleteMany({})

    for (let note of helper.initialNotes){
        let noteObject = new Note(note)
        await noteObject.save()
    }
})


describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')

        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(r => r.content)

        expect(contents).toContain(
            'Browser can execute only Javascript'
        )
    })
})

describe('viewing a specific note', () => {
    test('success with a valid id', async () => {
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
          .get(`/api/notes/${noteToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

       const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

        expect(resultNote.body).toEqual(processedNoteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/api/notes${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })

})

describe('addition of a new note', () => {
    let token = ''
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    beforeEach(async () => {
        const loginInfo = {
            username: 'root',
            password: 'sekret'
        }

        const login = await api.post('/api/login').send(loginInfo)
        token = login.body.token
    })

    test('succeeds with valid data and logged user', async () => {
        await api
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(r => r.content)
        expect(contents).toContain(
            'async/await simplifies making async calls'
        )
    })

    test('note without content is not added', async () => {
        const newNoteWithoutContent = {
            important: true
        }

        await api
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send(newNoteWithoutContent)
            .expect(400)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })

    test('sent note without logged user token is not authorized', async () => {
        const result = await api
            .post('/api/notes')
            .send(newNote)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toMatch('invalid token')
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
          .delete(`/api/notes/${noteToDelete.id}`)
          .expect(204)

        const notesAtEnd = await helper.notesInDb()

        expect(notesAtEnd.length).toBe(
          helper.initialNotes.length - 1
        )

        const contents = notesAtEnd.map(r => r.content)

        expect(contents).not.toContain(noteToDelete.content)
      })

})


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('we can retrieve all users from the server', async() => {
        const allUsersInDb = await helper.usersInDb()

        const allUsersResponse = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const allUsers = allUsersResponse.body

        expect(allUsers).toHaveLength(allUsersInDb.length)

        const usernames = allUsers.map(u => u.username)
        expect(usernames).toContain(allUsersInDb[0].username)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'peco',
            name: 'Peco Testandus',
            password: 'password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'senhasenha'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('user login with valid credentials', async () => {
        const allUsers = await helper.usersInDb()
        const dbUser = allUsers[0]

        const loginInfo = {
            username: 'root',
            password: 'sekret'
        }
        const loginUser = await api
            .post('/api/login/')
            .send(loginInfo)
            .expect(200)

        const loggedUser = loginUser.body
        expect(loggedUser.token).toBeDefined()
        expect(loggedUser.username).toEqual(dbUser.username)
    })

    test('with bad credentials, user login unhautorized with code 401', async (done) => {
        const loginInfo = {
            username: 'root',
            password: 'secret'
        }

        const result = await api
            .post('/api/login')
            .send(loginInfo)
            .expect(401)

        expect(result.body.error).toMatch('invalid username or password')
        done()
    })
})


afterAll(() => {
    mongoose.connection.close()
})