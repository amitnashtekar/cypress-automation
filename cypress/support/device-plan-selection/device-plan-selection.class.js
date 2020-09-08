class deviceDetail {
  getPlanNames = () =>
    cy.get(
      'div[data-component="PlanListing"] div[data-testid="planTitleBlock"]'
    );

  getPlanSelectBtns = () =>
    cy.get('div[data-testid="ctaBlock"] .button-group>button');

  getSelectedDeviceAndPlan = () => cy.get(".info-wrapper div.title");

  getContinueBtn = () =>
    cy.get('div[data-component="ProductSummary"] .cta-cart-wrapper button');

  getCustIntHeading = () => cy.get("h2.v-large-top");
}

export default deviceDetail;
