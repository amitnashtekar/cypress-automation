/// <reference types="Cypress" />

describe("visit device details page", function () {
    //it will run only once.
    //here we filterted samsung which will be applicable to all test cases
    before(() => {
        cy.visit("https://www.optus.com.au/mobile/phones/samsung/gs20-ultra-5g?contractLength=36")
    })

    describe("check correct device is selected('Samsung Galaxy S20 Ultra 5G')",() => {

        it("page has Samsung Galaxy S20 Ultra 5G' as heading", () => {
            // cy.log(cy.get('.ProductText__Title-sc-1wwj11g-0.jxyuLE')
            // .first().text())
            cy.get('.ProductText__Title-sc-1wwj11g-0.jxyuLE')
            .first().contains('Samsung Galaxy S20 Ultra 5G')
            
        })

        // toggeling button and check actually visible element
        it("by chosing 'gray 'color , only 'gray' color phone should visible", () => {
            cy.get('.fGDVis').click()
            cy.get('img[src="/content/dam/optus/images/shop/mobile/phones/samsung/samsung-galaxy-s20-ultra/carousel/samsung-gs20-ultra-grey-front-and-back.jpg/renditions/version-1583386661416/492.jpeg"]')
            .should('be.visible')
            cy.get('img[src="/content/dam/optus/images/shop/mobile/phones/samsung/samsung-galaxy-s20-ultra/carousel/samsung-gs20-ultra-black-front-and-back.jpg/renditions/version-1581571684538/492.jpeg"]')
            .should('not.be.visible')
            
        })

        it("by chosing 'black 'color , only 'black' color phone should visible", () => {
           
            cy.get('.bOyCWI').click()
            cy.get('img[src="/content/dam/optus/images/shop/mobile/phones/samsung/samsung-galaxy-s20-ultra/carousel/samsung-gs20-ultra-black-front-and-back.jpg/renditions/version-1581571684538/492.jpeg"]')
            .should('be.visible')
            cy.get('img[src="/content/dam/optus/images/shop/mobile/phones/samsung/samsung-galaxy-s20-ultra/carousel/samsung-gs20-ultra-grey-front-and-back.jpg/renditions/version-1583386661416/492.jpeg"]')
            .should('not.be.visible')
            
        })
        // anchor click Tab opening and browser back, forward navigation
        it("accordion of 'TALK & TEXT' should work and new tab should open", () => {
           
           cy.get('div.PlanCard__PlanCardWrapper-sc-189jzac-0.irokll:visible').as('planTile')

           cy.get('@planTile')
           .contains('TALK & TEXT').click()

           cy.get('@planTile')
           .contains("Optus Roaming Pass").invoke('removeAttr', 'target').click()          
            
        })
        //check browser navigations
        it("check correct Tab opened and go back to device details page again", () => {
           
            // cy.location().should((loc) => {
                
            //     expect(loc.href).to.eq('https://www.optus.com.au/for-you/mobile/plans/international-roaming/optus-roaming-pass')
            // })

            //OR

            cy.url().should('include', 'international-roaming/optus-roaming-pass');
            cy.go('back');
             
         })        

    })

})