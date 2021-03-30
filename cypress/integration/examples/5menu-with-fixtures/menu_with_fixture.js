/// <reference types="Cypress" />

// we can use custom functions as well
const getText = (el) => {
  return el.textContent;
};
describe("visit mobile/phones page", function () {
  //we loaded our JSON file from fixture and stored in
  // context object
  before(() => {
    cy.visit("https://www.optus.com.au/mobile/phones");

    cy.fixture("shop-menu/shop_menu.json").then((data) => {
      this.shopMenus = data;
    });
    //clicked the shop menu
    cy.get("#btnShowMegaNav").click();
  });
  beforeEach(() => {
    //storing each menu heaiding to use as key in fixture json
    cy.get(".nav-panel h5").then((elements) => {
      // we can debugger just like javascript
      //debugger;
      //here we retrived out custom function
      this.menuHeadings = elements.toArray().map(getText);
    });
  });

  describe("check for all menu items appreaing correctly", () => {
    //here we retrived all shop menus and macth against
    //our fixture json file
    it("check for 'shop' menu ", () => {
      cy.get(".nav-panel nav").each((navMenu, ind) => {
        cy.log(this.menuHeadings);

        const expectedMenus = this.shopMenus[this.menuHeadings[ind]];

        cy.wrap(navMenu)
          .children()
          .each((menuLink, ind) => {
            expect(menuLink.text()).to.equal(expectedMenus[String(ind)]);
          });
      });
    });

    //we can check attributes for e.g. acesbility attr or others
    //For dedicated to accessibility will show a special library later
    it("Menu item has accessibility attrubute present", () => {
      cy.get("nav#nav-primary-level").should(
        "have.attr",
        "aria-label",
        "Main Navigation Region"
      );
    });
  });
});
