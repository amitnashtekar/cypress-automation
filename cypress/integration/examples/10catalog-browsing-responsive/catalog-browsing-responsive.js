/// <reference types="Cypress" />

describe("'Iphone X' catalog browsing", //     viewportHeight: 812, //   {
//     viewportWidth: 375,
//   },
function () {
  before(() => {
    cy.fixture(
      "catalog-browsing-responsive/catalog-browsing-responsive.json"
    ).then((config) => {
      this.config = config;
    });
    //   Cypress.config("viewportHeight", 812);
    //   Cypress.config("viewportWidth", 375);
  });
  describe("testing for responsiveness", // {
  //   viewportHeight: 812,
  //   viewportWidth: 375,
  // },
  () => {
    // beforeEach(() => {
    //     //cy.viewport(375, 812)
    // })
    //load the page
    it("load catalog browsing", function () {
      cy.viewport(375, 812);
      cy.visit("https://www.optus.com.au/mobile/phones");
    });

    it("check for hamburger button", () => {
      cy.viewport(375, 812).then(() => {
        cy.get('header[data-testid="header"] button').eq(0).contains("Search");
      });
    });
    //they have removed the filter so test is failing
    it("check all filters are appearing", () => {
      cy.viewport(375, 812);
      cy.get(".UxShopProductFilterstyle__Ul-sc-17ci9tm-0 li").each(
        (filter, ind) => {
          expect(filter.find("label").text()).equal(this.config[String(ind)]);
        }
      );
    });
  });
});
