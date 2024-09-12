describe('WorkSpace Flow API Tests', () => {
   
    before(() => {
        // Ensure loginAPI runs before any tests that need authentication
        cy.loginAPI();
      });
   
    it('user should be able to create a new workspace via API check if a workspace already exists', () => {
        
        cy.manageWorkspace();
    })
})