/// <reference types="Cypress" />
import deviceDetail from '../../../support/device-plan-selection/device-plan-selection.class';

const deviceDetailPage = new deviceDetail()

describe("device, plan selection and continue to customer intent", function () {

    before(() => {
        cy.visit("https://www.optus.com.au/mobile/phones/samsung/gs20-ultra-5g?contractLength=36")
        cy.fixture("device-plan-selection/device-plan-selection.json").then((config) =>{
            this.config = config;
        })
    })


    describe("plan selection to customer Intent", () => {

        it("select configured plan", () => {
            cy.selectPlan(this.config.planToSelect, this.config.planSelectButton);                       

        })

        it("confirm correct device is selected", () => {
            deviceDetailPage.getSelectedDeviceAndPlan().eq(0)
            .should('have.text', this.config.confirmedDevice)                                         

        })

        it("confirm correct plan is selected", () => {
            deviceDetailPage.getSelectedDeviceAndPlan().eq(1)
            .should('have.text', this.config.confirmedPLan)                                         

        })

        it("click continue button", () => {
            deviceDetailPage.getContinueBtn()
            .contains(this.config.continueButton)                                              

        })  
        
        // it("check 'customer Intent' is loaded", () => {
        //     cy.url().should('include', this.config.custIntUrl)

        // })

        // it("check for 'customer intent' heading", () => {
        //     deviceDetailPage.getCustIntHeading().should('have.text', this.config.custIntnText)

        // })       


    })

})