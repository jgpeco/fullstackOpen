describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        
        const user = {
            name: 'test',
            username: 'root',
            password: 'secret',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function(){
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#input-username').type('root')
            cy.get('#input-password').type('secret')
            cy.contains('Login').click()

            cy.contains('test is logged')
        })
    })

        it('fails with incorrect credentials', function() {
            cy.get('#input-username').type('root')
            cy.get('#input-password').type('wrong')
            cy.contains('Login').click()

            cy.get('.notification-error')
             .should('have.css', 'color', 'rgb(255, 255, 255)')
             .and('have.css', 'background-color', 'rgb(254, 25, 66)')
             .and('contain', 'Wrong Credentials')
            
            cy.get('html').should('not.contain', 'test is logged')
        })
})