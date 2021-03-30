// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

Cypress.Commands.add('selectForCompare', (tileHeading) => {
    cy.get('.MobileDevicestyle__Title-sc-13i2889-6').each((comparLink, index) => {
                     
        if (comparLink.text() === tileHeading) {
            cy.log(comparLink.text())
            cy.get('.MobileDevicestyle__CompareBtn-sc-13i2889-10.iTQbAr').eq(index).click()
        }

    })
})

Cypress.Commands.add('hasElement', (e, cb) => {
    cy.wait(1000);
    cy.get('body').then(body => {
      if (body.find(e).length > 0) {
        cb();
      }
    });
  });



