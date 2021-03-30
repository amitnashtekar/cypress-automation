/// <reference types="Cypress" />

// can use nested describe block
// will helpful trick to skip beforeach for some tests
describe("visit catalog browsing", function () {
  //it will run only once.
  //here we filterted samsung which will be applicable
  // to all test cases
  before(() => {
    cy.visit("https://www.optus.com.au/mobile/phones");
    cy.get('div[data-component="DeviceListing"]>div>div>div')
      .children()
      .filter(":visible")
      .each((tile) => {
        const deviceName = tile.find("h4").text();
        console.log("deviceName", deviceName);
        if (deviceName === "Galaxy S20 5G") {
          cy.wrap(tile).contains("SELECT DEVICE").click();
        }
      });
  });

  describe("catalog browsing filters for mobile phones", () => {
    //this will run before each test block
    //we are storing planTIles so can be shared across test cases
    // also see the diffrence between console.log and cy.log
    beforeEach(() => {
      cy.get(
        'div[data-component="PlanListing"] .swiper-container .swiper-slide'
      ).as("planTiles");
      cy.log("@planTiles");
    });

    // how to interact with elements and
    //here to fins how many elements of same div class are present on screen
    it("plan tiles should be more than 3", () => {
      cy.get("@planTiles").should("have.length.greaterThan", 3);
    });

    // here we can see how to fins specific child in parent and click any
    //element in that found child
    it("select  'Galaxy S20 Ultra 5G' device ", () => {
      cy.get("@planTiles").each(($el, index) => {
        console.log("$el", $el);
        const planName = $el.find('div[data-testid="planTitleBlock"]').text();
        console.log("planName", planName);
        if (planName === "Medium Optus Choice") {
          expect(planName).to.equal("Medium Optus Choice");
          cy.wrap($el).as("planTile");
        }
      });
      // so here Now using cy.get('@planTile')
      // we can check all of the elements in this "tile" without going further down
      cy.get("@planTile").contains("$49.00");
      cy.get("@planTile").contains("DATA SHARING");
      cy.get("@planTile").contains("OPTUS SPORT + FITNESS");
      cy.get("@planTile").contains("TALK & TEXT");
    });

    //now below test case we cant get the cy.get("@planTile")
    // due to its scope limitation.
    //thats why it is good to use this in before/ beforeEach so all test cases
    //will have its access.

    // it("plan tile should have all basic", () => {
    //   cy.get("@planTile").contains("TALK & TEXT");
    // });
  });

  // now this describe will not have preveous page beforEach
  //But will have the before settings.
  describe("check for selected device", () => {
    // toggeling button and check actually visible element
    it("by chosing 'gray 'color , only 'gray' color phone should visible", () => {
      cy.get('div[data-component="ColourSwatch"]>div>div div').eq(1).click();
      cy.get(
        'img[src="/content/dam/optus/images/shop/mobile/phones/samsung/samsung-galaxy-s20-5g/carousel/samsung-galaxy-s20-5g-grey-front.jpg/renditions/version-1582172688825/492.jpeg"]'
      )
        .eq(0)
        .should("not.be.visible");
      //if we change it to  be visible then only it will pass.
      cy.get(
        'img[src="/content/dam/optus/images/shop/mobile/phones/samsung/samsung-galaxy-s20-5g/carousel/samsung-galaxy-s20-5g-blue-front-back.jpg/renditions/version-1582175585068/492.jpeg"]'
      )
        .eq(0)
        .should("not.be.visible");
    });
    it("user is redirected to correct device detail page", () => {
      cy.location().should((loc) => {
        expect(loc.href).to.include("mobile/phones/samsung/gs20-5g");
        expect(loc.search).to.eq("?contractLength=36");
        expect(loc.href).to.eq(
          "https://www.optus.com.au/mobile/phones/samsung/gs20-5g?contractLength=36"
        );
      });
    });
  });
});
