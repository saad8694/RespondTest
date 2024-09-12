class Login {

    /*****Page Objects */

    getEmailAddress() {
        return cy.get('#input-7')
    }

    getPassword() {
        return cy.get('#input-9')
    }

    getSignInBtn() {
        return cy.get('[data-pw="btn-signin"]')
    }

    /*** Methods */

    enterEmailAddress(emailAddress) {
        this.getEmailAddress().type(emailAddress)
    }

    enterPassword(password) {
        this.getPassword().type(password)
    }

    clickSignIn() {
        this.getSignInBtn().click()
    }
}

export default Login