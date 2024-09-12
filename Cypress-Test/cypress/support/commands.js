
import Login from "../pageObjects/login"
const login = new Login()

import Workspace from "../pageObjects/workspace"
const workSpace = new Workspace()

Cypress.Commands.add('login', () => {
    cy.fixture('example').then(function (data) {

        login.enterEmailAddress(data.email)
        login.enterPassword(data.password)
        login.clickSignIn()
    })

})

Cypress.Commands.add('Invalidlogin', () => {
    cy.fixture('example').then(function (data) {

        login.enterEmailAddress(data.email)
        login.enterPassword(data.invalidpassword)
        login.clickSignIn()
    })
})
Cypress.Commands.add('addWorkSpace', () => {
    cy.fixture('example').then(function (data) {

        workSpace.clickAddWorkSpace()
        workSpace.getNextBtn().should('be.disabled')
        workSpace.enterWorkSpaceName(data.workspacename)
        workSpace.getNextBtn().should('be.enabled')
        workSpace.clickNextBtn()
        workSpace.clickInviteUser()
        cy.reload()
    })

})

Cypress.Commands.add('deleteSpace', () => {
    cy.fixture('example').then(function (data) {

        workSpace.clickDottedIcon()
        workSpace.clickDeleteOption()
        workSpace.enterWSName(data.workspacename)
        workSpace.clickDeleteBtn()
    })

})
/****** APIS Commands */

// Login and get the auth token
Cypress.Commands.add('loginAPI', () => {
  cy.fixture('example').then((data) => {
      cy.request({
          method: 'POST',
          url: data.loginurl,
          headers: {
              'content-type': data.contentType,
              'accept': data.accept
          },
          body: {
              email: data.apiemail,
              password: data.password
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq('success');
          Cypress.env('authToken', response.body.data.idToken);
      });
  });
});

Cypress.Commands.add('invalidloginAPI', () => {
   
  cy.fixture('example').then(function (data) {
  cy.request({
    method: 'POST',
    url: data.loginurl,
    failOnStatusCode: false,
    headers: {
      'content-type': data.contentType,
      'accept': data.accept
    },
    body: {
      email: data.email,
      password: data.invalidpassword
    }
  }).then((response) => {
      // Assertions for invalid login
      expect(response.status).to.eq(401)
      expect(response.body.status).to.eq('NotAuthorizedException')
      expect(response.body.message).to.eq('Incorrect username or password.')
  })
})
})


// Fetch workspace and delete if it exists
Cypress.Commands.add('manageWorkspace', () => {
  const authToken = Cypress.env('authToken');
  cy.fixture('example').then((data) => {
      const apiUrl = 'https://app.respond.io/api/organization/245928/spaces';

      cy.request({
          method: 'POST',
          url: apiUrl,
          headers: {
            'Accept': 'application/json, text/plain, */*',
              'Authorization':  `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              'orgid': '245928'
          },
          body: {
             "search": "",
        "pagination": {
          "page": 1,
          "itemsPerPage": 25,
          "sortBy": ["name"],
          "descending": [false],
          "rowsPerPage": 25
              }
          }, failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.eq(200);
          const workspaces = response.body.data.items;
          if (workspaces.length > 0) {
              const workspaceId = workspaces[0].id;
              cy.deleteWorkspace(workspaceId).then(() => {
                  cy.createWorkspaceAPI();  // Recreate the workspace
                  cy.assignUser();
              });
          } else {
              cy.createWorkspaceAPI();  // Create a new workspace if none exists
              cy.assignUser();
          }
      });
  });
});

// Create a new workspace
Cypress.Commands.add('createWorkspaceAPI', () => {
  const authToken = Cypress.env('authToken');
  cy.fixture('example').then((data) => {
      const apiUrl = `https://app.respond.io/api/organization/245928/spaces/create`;
      cy.request({
          method: 'POST',
          url: apiUrl,
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              'orgid': '245928'
          },
          body: {
              name: data.workspacename,
              timezone: data.timezone
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq('success');
          cy.wrap(response.body.data.id).as('workspaceId');
      });
  });
});

// Delete workspace by ID
Cypress.Commands.add('deleteWorkspace', (workspaceId) => {
  const authToken = Cypress.env('authToken');
  cy.fixture('example').then((data) => {
      const apiUrl = `https://app.respond.io/api/organization/245928/spaces/${workspaceId}`;
      cy.request({
          method: 'DELETE',
          url: apiUrl,
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              'orgid': data.orgId
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(`Workspace with ID ${workspaceId} deleted.`);
      });
  });
});

// Assign user to workspace
Cypress.Commands.add('assignUser', () => {
  const authToken = Cypress.env('authToken');
  cy.get('@workspaceId').then((workspaceId) => {
      cy.fixture('example').then((data) => {
          const apiUrl = `https://app.respond.io/api/organization/245928/spaces/users`;
          cy.request({
              method: 'POST',
              url: apiUrl,
              headers: {
                  'Authorization': `Bearer ${authToken}`,
                  'Content-Type': 'application/json',
                  'orgid': data.orgId
              },
              body: {
                  spaceId: workspaceId,
                  users: [
                      {
                          email: data.apiemail,
                          role: 'owner'
                      }
                  ]
              }
          }).then((response) => {
              expect(response.status).to.eq(200);
              cy.log('User assigned successfully.');
          });
      });
  });
});
