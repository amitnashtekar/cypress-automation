/// <reference types="Cypress" />

describe("visit sq-check page", function () {
  before(() => {
    cy.visit(
      "https://www.optus.com.au/broadband-nbn/home-broadband/plans/shop"
    );
  });

  describe("check for SQ-check component ", () => {
    it("user enters address in autocomplete box", () => {
      cy.get(".ux-type-ahead input").type("112 main street, BLACKTOWN");
      cy.get(".all-results li a").each((addOption, index) => {
        cy.log(addOption.text());
        if (" 112 Main Street, BLACKTOWN  NSW 2148 " === addOption.text()) {
          cy.log("found");

          cy.wrap(addOption).click();
          cy.wrap(addOption).click();
        }
      });
    });
    it("user does sq-check for his address", () => {
      cy.get(".ux-button-sd > .primary").click();
      cy.wait(5000); // we can get rid of this wait
    });

    it("user verifies the result post sq-check", () => {
      cy.get(".ux-radio-button .labelcontainer label")
        .eq(0)
        .click()
        .then((selectedAddress) => {
          this.selectedAddress = selectedAddress.text().trim(); //be cautious while storing
          //in varibale since it is out side of Cypress context
        });
      cy.get(".content-fix.v-normal-top > .ux-button-sd > .primary")
        .click()
        .then(() => {
          cy.get(".sq-output").contains(this.selectedAddress);
        });
    });
  });
});
