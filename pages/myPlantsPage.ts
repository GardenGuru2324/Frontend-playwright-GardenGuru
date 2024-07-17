import { Page, Locator } from "@playwright/test";
import { errorMessages } from "../errors/errorMessages";

export class MyPlantsPage {
  readonly page: Page;
  readonly myPlantsSearchInput: Locator;
  readonly myPlantsSubmitButton: Locator;
  readonly myPlantsPlantCard: Locator;
  readonly myPlantsPlantLocations: Locator;
  readonly myPlantsPlantLocation: Locator;
  readonly myPlantsLoading: Locator;
  readonly myPlantsNoPlantsError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myPlantsSearchInput = page.locator("id=search-input");
    this.myPlantsPlantCard = page.locator("id=plant-card-0"); // Need to fix id selection in frontend??
    this.myPlantsPlantLocations = page.locator("id=locations-section");
    this.myPlantsPlantLocation = page.locator("p").nth(1);
    this.myPlantsLoading = page.locator("id=loading-items");
    this.myPlantsNoPlantsError = page.getByText(errorMessages.userHasNoPlants); // ErrorMessagePage nog een id geven!
  }
}
