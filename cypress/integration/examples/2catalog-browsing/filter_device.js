/// <reference types="Cypress" />
describe("catalog browsing filters for mobile phones", function () {
  //load the page
  it("load catalog browsing", function () {
    cy.visit("https://www.optus.com.au/mobile/phones");
  });

  // how to interact with elements and
  //here to fins how many elements of same div class are present on screen
  it("choose samsung option from brand filter", () => {
    // cy.get(
    //   ":nth-child(1) > .UxShopProductFilterstyle__DropDownLink-sc-17ci9tm-2"
    // ).click();
    debugger; // this will not work

    cy.get('div[data-component="DeviceListing"]>div>div>div')
      .children()
      .filter(":visible")
      .then((tile) => {
        debugger;
        //here all tiles will be taken in to account
        cy.wrap(tile).get("h4").should("contain.text", "Galaxy S20 5G");
        //use if .its-> it extracts the proprty from object.
        cy.wrap(tile)
          .get('div>a[role="link"]')
          .its("length")
          .should("be.greaterThan", 8);
      });
  });
  //to iterate each element
  // to take each tile in to account independantly.
  it("select  'Galaxy S20 5G' device ", () => {
    cy.get('div[data-component="DeviceListing"]>div>div>div')
      .children()
      .filter(":visible")
      .each((tile) => {
        debugger;

        console.log("tile", tile); // we can use console.log as well
        const deviceName = tile.find("h4").text();
        console.log("deviceName", deviceName);
        if (deviceName === "Galaxy S20 5G") {
          console.log(" corrrect deviceName", deviceName);
          //here tile will be simple HTML element
          // by wrapping it with cy we can use all cypress commands
          // on this
          // contains check target in whole selected element
          cy.wrap(tile).contains("SELECT DEVICE").click();
          cy.wait(500); // we can aslo put the wait forcefully for any reason
        }
      });
  });
  // .should -> "have" & "be"
  it("selected device is present on device detail page", () => {
    cy.get('div[data-component="ProductText"]')
      .filter(":visible")
      .should("have.text", "Samsung Galaxy S20 5G");
  });
});
