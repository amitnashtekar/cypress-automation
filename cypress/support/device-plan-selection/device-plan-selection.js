//here also we imported our device details utility .
import deviceDetail from "./device-plan-selection.class";
const deviceDetailPage = new deviceDetail();

Cypress.Commands.add("selectPlan", (planToSelect, selectButtonText) => {
  deviceDetailPage.getPlanNames().each((planName, index) => {
    if (planName.text() === planToSelect) {
      deviceDetailPage
        .getPlanSelectBtns()
        .eq(index)
        .contains(selectButtonText)
        .click();
    }
  });
});
