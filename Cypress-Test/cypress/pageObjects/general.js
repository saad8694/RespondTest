class General {

    /*** Page Objects */

    getSettingsIcon(){
        return cy.get('.v-list-item__append').eq(6)
    }

    getWorkSpacesMenuItem(){
        return cy.get('[data-pw="workspaces"]')
    }

    /**** Methods */

    clickSettings(){
        this.getSettingsIcon().click()
    }

    clickWorkSpacesMenuItem(){
        this.getWorkSpacesMenuItem().click()
    }
}

export default General