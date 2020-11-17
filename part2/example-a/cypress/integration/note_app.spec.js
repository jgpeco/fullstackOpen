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

    describe('when logged in', function() {
        beforeEach(function() {
            cy.contains('Login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
        })

        it('a new note can be created', function() {
            cy.contains('New Note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('Save').click()
            cy.contains('a note created by cypress')
        })

        describe('and a note exists', function () {
            beforeEach(function() {
                cy.contains('New Note').click()
                cy.get('input').type('another note cypress')
                cy.contains('Save').click()
            })

            it('it can be made important', function () {
                cy.contains('another note cypress')
                  .contains('make important')
                  .click()

                cy.contains('another note cypress')
                  .contains('make not important')
            })
        })
    })
})