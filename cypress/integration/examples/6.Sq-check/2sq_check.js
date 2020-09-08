/// <reference types="Cypress" />

describe("visit sq-check page", function () {
  //here we used the base url so no need o give the absolute path.
  // same we have done for REST api url also.
  before(() => {
    cy.visit("broadband-nbn/home-broadband/plans/shop");
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

      //cy.wait(5000);// no need to put wait since we are intecepted the REST
      // so we have mechanisam to wait untill REST finishes.
    });

    it("user verifies the result post sq-check", () => {
      //what cy.server() does...
      //Options->
      //In this example, our matching requests will be delayed 1000ms
      //and have a status of 422, but its response will be what was set
      //in cy.route().

      // cy.server({
      //   method: 'POST',
      //   delay: 1000,
      //   status: 422,
      //   response: {}// here it will use the response set in route
      // })
      cy.server();
      cy.route(
        "POST",
        "/mcssapi/rp-webapp-9-common/sdp/matrix/check-service-coverage*"
      ).as("checkCoverage"); //making alias for thi route
      debugger;
      cy.get(".ux-radio-button .labelcontainer label")
        .eq(0)
        .click()
        .then((selectedAddress) => {
          debugger;
          this.selectedAddress = selectedAddress.text().trim();
          cy.log(this.selectedAddress);
        });
      cy.get(".content-fix.v-normal-top > .ux-button-sd > .primary").click();
      cy.wait("@checkCoverage"); // cypress will wait till this alias gets resolved
      //so this will get resolved once the REST got the response.
      //so need not to worry how much time need to put in old wait(***) time.

      //below test is going to fail...why??
      debugger;
      cy.get(".sq-output").should("contain.text", this.selectedAddress);

      //   cy.get(".sq-output")
      //     .invoke("text")
      //     .then((el) => {
      //       expect(el).to.include(this.selectedAddress);
      //     });
    });
  });
});
