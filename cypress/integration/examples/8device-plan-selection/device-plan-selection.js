/// <reference types="Cypress" />

//here we have imported all out utility functions.
import deviceDetail from "../../../support/device-plan-selection/device-plan-selection.class";

//object design pattern
const deviceDetailPage = new deviceDetail();

describe("device, plan selection and continue to customer intent", function () {
  before(() => {
    cy.visit("/mobile/phones/samsung/gs20-5g?contractLength=36");
    cy.fixture("device-plan-selection/device-plan-selection.json").then(
      (config) => {
        this.config = config;
      }
    );
  });

  describe("plan selection to customer Intent", () => {
    it("select configured plan", () => {
      cy.selectPlan(this.config.planToSelect, this.config.planSelectButton);
    });

    it("confirm correct device is selected", () => {
      deviceDetailPage
        .getSelectedDeviceAndPlan()
        .eq(0)
        .should("have.text", this.config.confirmedDevice);
    });

    it("confirm correct plan is selected", () => {
      deviceDetailPage
        .getSelectedDeviceAndPlan()
        .eq(1)
        .should("have.text", this.config.confirmedPLan);
    });

    it("click continue button", () => {
      deviceDetailPage.getContinueBtn().contains(this.config.continueButton);
      //.click();
    });
  });
});
