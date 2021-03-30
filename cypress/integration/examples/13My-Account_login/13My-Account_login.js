/// <reference types="Cypress" />
const user = {
    'username': 'abc@ed.com',
    'password': 'test123'
}
describe("My Account Login Page", function () {
  before(() => {
    cy.visit("/my-account-login");
       
  });

  describe("Check for Login form", () => {
   
    it("check for navigation menus", () => {
        cy.findByRole('navigation', {name: /Main Navigation Region/i}).within(() => {
            cy.findByRole('link', {name: /For you/i}).should('exist')
            cy.findByRole('link', {name: /For Business/i}).should('exist')
            cy.findByRole('link', {name: /For Enterprise/i}).should('exist')
            cy.findByRole('link', {name: /About Us/i}).should('exist')
          })
    });
    it("check for wrong username", () => {
        cy.findByRole('form', {id: /loginForm/i}).within(() => {
            cy.findByRole('textbox', {name: /Email address/i}).clear().type(user.username)
            cy.findByLabelText(/password/i).type(user.password)            
            //cy.findByRole('button', {name: /Log in/i}).click()            
          })
    });
    it("check for Enter key", () => {
        cy.findByRole('form', {id: /loginForm/i}).within(() => {
            cy.findByRole('textbox', {name: /Email address/i}).clear().type(user.username)            
            //cy.findByLabelText(/password/i).type(`${user.password}{enter}`)                      
          })
    });

  });
});
