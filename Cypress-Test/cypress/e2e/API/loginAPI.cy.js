describe('Login API Test', () => {
    it('user should be successfully login with valid creds', () => {
        cy.loginAPI()
  })

  it('user should not be logged in with invalid creds',() => {

    cy.invalidloginAPI()
  })
})
  