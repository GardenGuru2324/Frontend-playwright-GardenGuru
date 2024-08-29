import { expect } from "@playwright/test";
import { test } from "../fixtures/pages.fixture";
import { LoginPageAction } from "../actions/loginAction";
import { pageRoutes } from "../routes/pageRoutes";
import { NavigationAction } from "../actions/navigationAction";

test.describe("Profile Page", () => {
  let loginAction: LoginPageAction;
  let navigationAction: NavigationAction;

  test.beforeEach(async ({ page }) => {
    const navigationAction = new NavigationAction(page);
    const loginAction = new LoginPageAction(page);

    await page.goto(pageRoutes.loginPage);
    await loginAction.loginPlayWrightTestuser();
  });

  test("User can navigate to profile page", async ({
    profilePage: profilePage,
  }) => {
    await navigationAction.navigateToPage("profile");
    await profilePage.page.waitForTimeout(1000);
    await expect(profilePage.page.url()).toBe(pageRoutes.profilePage);
  });

});
