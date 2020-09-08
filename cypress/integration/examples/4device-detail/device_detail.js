/// <reference types="Cypress" />

//NO NEED TO COVER. ALMOST ALL IS COVERED.
describe("visit device details page", function () {
  //it will run only once.
  //here we filterted samsung which will be applicable to all test cases
  before(() => {
    cy.visit(
      "https://www.optus.com.au/mobile/phones/samsung/gs20-5g?contractLength=36"
    );
    cy.get(
      'div[data-component="PlanListing"] .swiper-container .swiper-slide'
    ).as("planTiles");
    this.storedPLans = cy.get("@planTiles"); //here $Chainer promise will be get
    //stored instead of element
    cy.log("@planTiles");
    cy.log(this.storedPLans); // here we can see that promise. SO can use like this
  });

  describe("'Optus Roaming Pass' link is working", () => {
    //need to open anchor in same tab
    // anchor click Tab opening and browser back, forward navigation
    it("accordion of 'TALK & TEXT' should work and new tab should open", () => {
      cy.get("@planTiles").eq(1).contains("TALK & TEXT").click();

      cy.get("@planTiles")
        .eq(1)
        .contains("Optus Roaming Pass")
        .invoke("removeAttr", "target") //here we removed the target
        .click();
    });
    //check browser navigations
    it("check correct Tab opened and go back to device details page again", () => {
      // cy.location().should((loc) => {

      //     expect(loc.href).to.eq('https://www.optus.com.au/for-you/mobile/plans/international-roaming/optus-roaming-pass')
      // })

      //OR

      cy.url().should("include", "international-roaming/optus-roaming-pass");
      cy.pause();
      cy.go("back");
    });
  });
});
