import { expect } from "@playwright/test";
import { test } from "../fixtures/pages.fixture";
import { errorMessages } from "../errors/errorMessages";
import { LoginPageAction } from "../actions/loginAction";
import { mockApiResponse } from "../common/common";
import { apiRoutes } from "../routes/apiRoutes";
import { pageRoutes } from "../routes/pageRoutes";
import { NavigationAction } from "../actions/navigationAction";

test.describe("My Plants Page", () => {
  let loginAction: LoginPageAction;
  let navigationAction: NavigationAction;

  test.beforeEach(async ({ page }) => {
    navigationAction = new NavigationAction(page);
    loginAction = new LoginPageAction(page);

    await page.goto(pageRoutes.loginPage);

    await loginAction.loginPlayWrightTestuser();
  });

  test("User can navigate to my plants", async ({ myPlantsPage }) => {
    await navigationAction.navigateToPage("myPlants");
    await myPlantsPage.page.waitForTimeout(1000);
    await expect(myPlantsPage.page.url()).toBe(pageRoutes.myPlantsPage);
  });

  // Test done, implementatie is er nog niet.
  test("User can find plant in my plants", async ({ myPlantsPage }) => {
    const searchValue = "Aloe Vera";

    await navigationAction.navigateToPage("myPlants");

    await myPlantsPage.myPlantsSearchInput.fill(searchValue);

    const plantCard = await myPlantsPage.myPlantsPlantCard;

    await expect(plantCard).toContainText(searchValue);
  });

  test.skip("User can use plant location selection", async ({ myPlantsPage }) => {
    await navigationAction.navigateToPage("myPlants");

    await myPlantsPage.page.waitForTimeout(2000);

    await myPlantsPage.myPlantsPlantLocations.evaluate((element) => (element.scrollLeft = 100));

    const scrollLeft = await myPlantsPage.myPlantsPlantLocations.evaluate((element) => element.scrollLeft);
    expect(scrollLeft).toBeGreaterThan(0); // Validate if the scroll happend

    const locationToClick = await myPlantsPage.myPlantsPlantLocation;
    await locationToClick.click();

    await expect(locationToClick).toHaveClass(/underline/);
  });

  test("User can see loading state", async ({ myPlantsPage }) => {
    await navigationAction.navigateToPage("myPlants");

    const loadingMyPlants = await myPlantsPage.myPlantsLoading;

    await expect(loadingMyPlants).toBeVisible();
  });

  test.skip("User can see error", async ({ myPlantsPage }) => {
    await mockApiResponse(404, apiRoutes.myPlantsPage, myPlantsPage.page);

    await navigationAction.navigateToPage("myPlants");

    const errorMessage = await myPlantsPage.myPlantsNoPlantsError;
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });
});
