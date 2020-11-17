describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Test User',
            username: 'root',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Note app, Department of Pecosville')
    })

    it('login form can be opened', function() {
        cy.contains('Login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('password')
        cy.get('#login-button').click()

        cy.contains('Test User logged')
    })

    it('login fails with wrong password', function() {
        cy.contains('Login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong Credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Test User logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'root', password: 'password' })
        })

        it('a new note can be created', function() {
            cy.contains('New Note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('Save').click()
            cy.contains('a note created by cypress')
        })

        describe('and a note exists', function () {
            beforeEach(function() {
                cy.createNote({ content: 'first note cypress', important: false, })
                cy.createNote({ content: 'second note cypress', important: false, })
                cy.createNote({ content: 'third note cypress', important: false, })
            })

            it('other of those can be made important', function () {
                cy.contains('second note').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make not important')
            })

        })
    })
})