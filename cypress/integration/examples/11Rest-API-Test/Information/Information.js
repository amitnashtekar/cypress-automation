/// <reference types="Cypress" />

describe("Information Rest Stub", function () {
  it("anaonymous information REST should have all desire atrrbutes in response", () => {
    cy.server();
    cy.route(
      "GET",
      "https://www.optus.com.au/api/cxf/au-loginservice/checkLogin*"
    ).as("authentication");
    cy.visit("https://www.optus.com.au/mobile/phones");
    // way to check each XHR attribute
    cy.wait("@authentication").should("have.property", "status", 200);
    // way
    cy.get("@authentication")
      .its("response.body.isLoggedIn")
      .should("equal", false);
    cy.get("@authentication")
      .its("response.body")
      .should("deep.equal", {
        isLoggedIn: false,
        isServiceLevel: false,
        isAccountLevel: false,
      });
    cy.get("@authentication").should((xhr) => {
      console.log(xhr);
      expect(xhr.response.headers, "response headers").to.include({
        "content-type": "application/json",
      });
    });
  });

  it("anaonymous information REST with STUB response", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://www.optus.com.au/api/cxf/au-loginservice/checkLogin*",
      status: 201,
      response: {
        isLoggedIn: true,
        isServiceLevel: false,
        isAccountLevel: true,
      },
      delay: 100,
    }).as("authentication");
    cy.visit("https://www.optus.com.au/mobile/phones");

    cy.wait("@authentication").should("have.property", "status", 201);

    cy.get("@authentication")
      .its("response.body.isLoggedIn")
      .should("equal", true);
    cy.get("@authentication")
      .its("response.body")
      .should("deep.equal", {
        isLoggedIn: true,
        isServiceLevel: false,
        isAccountLevel: true,
      });
    cy.get("@authentication").should((xhr) => {
      console.log(xhr);
      expect(xhr.response.headers, "response headers").to.include({
        "content-type": "application/json; charset=utf-8",
      });
    });
  });
});
