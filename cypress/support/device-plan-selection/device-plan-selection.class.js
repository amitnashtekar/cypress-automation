class deviceDetail {
    getPlanNames =() => cy.get('.PlanBlockTitle__Wrapper-sc-8h0aue-0.ekZxky')

    getPlanSelectBtns = () => cy.get('.PlanBlockCTASelect__SCButton-tw7509-0')

    getSelectedDeviceAndPlan = () => cy.get('.info-wrapper div.title')

    getContinueBtn = () => cy.get('[data-testid=btnCart]')

    getCustIntHeading = () => cy.get('h2.v-large-top')

}

export default deviceDetail;