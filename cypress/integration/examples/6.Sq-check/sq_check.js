/// <reference types="Cypress" />





describe("visit sq-check page", function () {
    //it will run only once.
    //here we filterted samsung which will be applicable to all test cases
    before(() => {
        cy.visit("https://www.optus.com.au/broadband-nbn/home-broadband/plans/shop")

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
            cy.get('#label-r-663').click();
            cy.get('.content-fix.v-normal-top > .ux-button-sd > .primary').click().then(() => {
                cy.get('.sq-output')
                .contains("Shop 1/112 MAIN ST, BLACKTOWN, NSW 2148")
                })
        })
        

        

    })
    


})