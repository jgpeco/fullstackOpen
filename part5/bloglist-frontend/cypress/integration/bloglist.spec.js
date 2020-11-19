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

    describe('When logged in', function(){
        beforeEach(function() {
            cy.login({ username: 'root', password: 'secret' })
        })

        it('A blog can be created', function(){
            cy.contains('Create New Blog').click()
            cy.get('#input-title').type('test title')
            cy.get('#input-author').type('test author')
            cy.get('#input-url').type('test url')
            cy.get('.blog-form').submit()

            cy.get('.notification-success')
              .should('have.css', 'color', 'rgb(255, 255, 255)')
              .and('have.css', 'background-color', 'rgb(0, 128, 0)')
              .and('contain', 'New Blog')
            
            cy.contains('test title')
        })

        const dummyBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }

        
        it('A user can like a blog', function(){
            cy.createBlog(dummyBlog)
            cy.contains('test title').parent().as('blogDiv')

            cy.get('@blogDiv')
              .contains('View Details')
              .click()          
            
            cy.get('html').should('contain', 'Likes: 0')

            cy.get('@blogDiv')
              .contains('like')
              .click()
            
            cy.get('@blogDiv').should('contain', 'Likes: 1')
            
            cy.get('.notification-success').contains('updated')
        })

        it('The owner of the blog can delete it', function(){
            cy.createBlog(dummyBlog)
            cy.contains('test title').parent().as('blogDiv')

            cy.get('@blogDiv')
              .contains('View Details')
              .click()
            
            cy.get('@blogDiv')
              .contains('Remove')
              .click()
            
            cy.get('.notification-success').contains('Blog Removed')
            cy.get('html').should('not.contain', 'test title')
        })

        it(`A user that doesn't created the blog should not be able to delete it`, function(){
            cy.createBlog(dummyBlog)
            cy.contains('Logout').click()

            const anotherUser = {
                name: 'another user',
                username: 'other',
                password: 'password'
            }
            cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
            cy.login({ username: 'other', password: 'password' })

            cy.contains('test title').parent().as('blogDiv')
            cy.get('@blogDiv')
              .contains('View Details')
              .click()
            
            cy.get('@blogDiv').should('not.contain', 'Remove')
        })

        it.only('Should sort blogs based on likes', function(){
            cy.createBlog(dummyBlog)
            cy.createBlog({
                title: 'blog with more likes',
                author: 'test author',
                url: 'test url',
                likes: 4,
            })
            cy.createBlog({
                title: 'blog with medium likes',
                author: 'test author',
                url: 'test url',
                likes: 2,
            })

            cy.get('.blogItem').should('have.length', 3)
            cy.get('.blogItem').first().should('contain', 'blog with more likes')
            cy.get('.blogItem').last().should('contain', 'test title')

        })
    })     
})

