/// <reference types="Cypress" />
//to run in command prompt:
//npm run cy:run -- --spec "cypress/integration/examples/Sq-check-accessibility/Sq-check-accessibility.js
import terminalLog from '../../../support/accessibility-callback/accessibility-callback';


  


describe("visit sq-check page", function () {
    
    //Here we have defined custom env varibales
    //this can also be set be command prompt
    before(() => {
        cy.visit(Cypress.env("sq_page_url"))
        cy.injectAxe()
        //we can run it for whole page
        //cy.checkA11y()

    })
    // Applying a context and run parameters
    it('Has no detectable a11y violations on load (with custom parameters)', () => {
        // Test the page at initial load (with context and options)
        cy.checkA11y('body', {
        runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'section508']
        }
        },terminalLog)
        //above we can also set rules
        // {
        //     exclude: ['.article-action'],
        //   },
        //   {
        //     rules: {
        //       'empty-heading': { enabled: false },
        //       'scrollable-region-focusable': { enabled: false },
        //     },
        //   }
    })


    describe("check for SQ-check component ",() => {

        it("user enters address in autocomplete box", () => {
            // cy.log(cy.get('.ProductText__Title-sc-1wwj11g-0.jxyuLE')
            // .first().text())
            cy.get('.ux-type-ahead input').type('112 main street, BLACKTOWN')
            cy.get('.all-results li a').each((addOption, index) => {
                cy.log(addOption.text())
                // if (addOption.text().indexOf("112 Main Street, BLACKTOWN  NSW 2148".trim()) > -1 ) {
                //     cy.log('found')
                //     addOption.click();
                // }
                if (" 112 Main Street, BLACKTOWN  NSW 2148 " === addOption.text() ) {
                    cy.log('found')
                    
                    cy.wrap(addOption).click();
                    cy.wrap(addOption).click();
                }
                
            })
            
            
            
            
        })
        it("user does sq-check for his address", () => {
            cy.get('.ux-button-sd > .primary').click()
            cy.wait(5000)           
           

        })
      
        it("user verifies the result post sq-check", () => {
            cy.get('.labelcontainer label').eq(0).then((address) =>{
                this.seletedAddress = address.text()
            })
            cy.get('.labelcontainer label').eq(0).click();
            cy.get('.content-fix.v-normal-top > .ux-button-sd > .primary').click().then(() => {
                cy.get('.sq-output')
                .contains(this.seletedAddress.trim())
                })
                cy.checkA11y('.sq-output', {
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2a', 'wcag2aa', 'section508']
                    }
                    },terminalLog)
        })
        

        

    })
    


})