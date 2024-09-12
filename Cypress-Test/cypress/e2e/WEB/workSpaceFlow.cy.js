///<reference types = "cypress"/>

import General from "../../pageObjects/general"
const gen = new General()

describe('User Workspace Flow Test Suite', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('User should be able to delete and create a new workspace', () => {
        cy.login()
        gen.clickSettings()
        cy.contains('Settings').should('be.visible')
        
        gen.clickWorkSpacesMenuItem()
        cy.deleteSpace()
        cy.addWorkSpace()
    })
})