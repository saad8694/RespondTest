///<reference types = "cypress"/>

describe('Login Tests Suite', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('user should be able to login with valid credentials', () => {
        cy.login()
    })

    it('user should not be able to login with invalid credentials', () => {
        cy.Invalidlogin()
        cy.fixture('example').then(function (data) {
        cy.contains(data.invalidCreds).should('be.visible')
        })
    })
})
