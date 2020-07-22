/// <reference types="Cypress" />


describe("visit 'device listing' page", function () {

    before(() => {
        cy.visit("https://www.optus.com.au/mobile/phones")
        cy.fixture("compare-tiles/compare-tiles.json").then((compareTileObj) =>{
            this.devicesToCompare = compareTileObj.tilesToCompare;
        })
    })


    describe("compare devices test", () => {

        it("select devices to compare", () => {
            //Cypress provides lodash out of box
            Cypress._.each(this.devicesToCompare, (deviceName) => {
                cy.selectForCompare(deviceName);
            })            

        })

        it("compare block should be visible", () => {
            cy.get(".CompareBarstyle__CompareBarWrapper-sc-1kbqfqw-0.cHuMfH.show").should('be.visible');
        })

        it("correct devices selected for comparison", () => {
            // here u can pause test and analyze wats going on.......!!
            cy.pause()
            cy.get('.CompareBarstyle__Model-sc-1kbqfqw-6.bBFGiP').each((coparedDevice, ind) => {
                expect(coparedDevice.text()).equal(this.devicesToCompare[ind])
            })
        })


    })

})