class Workspace {

    /***Page Objects */

    getAddWorkSpaceBtn() {
        return cy.get('span').contains('Add Workspace')
    }

    getAddWorkSpaceNameField() {
        return cy.get('[placeholder="Name your workspace e.g. Customer Support"]')
    }

    getDottedIcon(){
        return cy.get('.dls-txt-body > .v-btn > .v-btn__content > .dls-txt-button > .v-icon')
    }

    getDeleteOption(){
        return cy.contains('Delete')
    }

    getEnterWSName(){
        return cy.get('[placeholder="Test Workspace"]')
    }

    getNextBtn() {
        return cy.get('[data-pw="btn-next"]')
    }

    getDeleteBtn(){
       return cy.get('span.dls-txt-button').contains('Delete')
    }

    getInviteUser(){
       // return cy.get('.float-end > .v-btn > .v-btn__content > .dls-txt-button')
       return cy.get('span.dls-txt-button').contains('Invite Users')
    }
    /***Methods */

    clickAddWorkSpace() {
        this.getAddWorkSpaceBtn().click({ force: true })
    }

    enterWorkSpaceName(workspaceName) {
        this.getAddWorkSpaceNameField().type(workspaceName)
    }

    clickNextBtn() {
        this.getNextBtn().click()
    }

    clickDottedIcon(){
        this.getDottedIcon().click()
    }

    clickDeleteOption(){
        this.getDeleteOption().click()
    }

    enterWSName(workspace){
        this.getEnterWSName().type(workspace)
    }

    clickDeleteBtn(){
        this.getDeleteBtn().click()
    }

    clickInviteUser(){
        this.getInviteUser().click({ multiple: true })
    }
}

export default Workspace