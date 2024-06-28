import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

type PageFixture = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<PageFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
