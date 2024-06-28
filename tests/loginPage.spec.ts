import { expect } from "@playwright/test";
import { test } from "../fixtures/pages.fixture";
import { errorMessages } from "../errors/errorMessages";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://gardenguru-preprod.vercel.app/");
  });

  test("Login page shout have correct form", async ({ loginPage }) => {
    const loginForm = await loginPage.loginForm;
    await expect(loginForm).toBeVisible();
  });

  test("User can not submit when email and password input is empty", async ({ loginPage }) => {
    const submitButton = await loginPage.loginSubmitButton;
    await submitButton.click();

    const emailInput = loginPage.page.locator("input#email-input[required]");

    await expect(emailInput).toBeVisible();
  });

  test("User can not submit when password input is empty", async ({ loginPage }) => {
    await loginPage.loginMailInput.fill("playWright-tester@gmail.com");

    const submitButton = await loginPage.loginSubmitButton;
    await submitButton.click();

    const passwordInput = loginPage.page.locator("input#password-input[required]");

    await expect(passwordInput).toBeVisible();
  });

  test("User can not submit when email input is empty", async ({ loginPage }) => {
    await loginPage.loginPasswordInput.fill("playwright");

    const submitButton = await loginPage.loginSubmitButton;
    await submitButton.click();

    const emailInput = loginPage.page.locator("input#email-input[required]");

    await expect(emailInput).toBeVisible();
  });

  test("User can not login when email is rong", async ({ loginPage }) => {
    await loginPage.loginMailInput.fill("playWright@gmail.com");
    await loginPage.loginPasswordInput.fill("playwright");

    const submitButton = await loginPage.loginSubmitButton;
    await submitButton.click();

    const errorMessage = loginPage.loginErrorMessage;

    await expect(errorMessage).toContainText(errorMessages.userNotFound);
  });

  test("User can not login when password is rong", async ({ loginPage }) => {
    await loginPage.loginMailInput.fill("playWright-tester@gmail.com");
    await loginPage.loginPasswordInput.fill("playwright");

    const submitButton = await loginPage.loginSubmitButton;
    await submitButton.click();

    const errorMessage = loginPage.loginErrorMessage;

    await expect(errorMessage).toContainText(errorMessages.invalidPassword);
  });

  test("User can login", async ({ loginPage }) => {
    await loginPage.loginMailInput.fill("playWright-tester@gmail.com");
    await loginPage.loginPasswordInput.fill("admin123");

    const submitButton = await loginPage.loginSubmitButton;
    await submitButton.click();

    await loginPage.page.waitForTimeout(1000);

    const isAuthenticated = await loginPage.page.evaluate(() => localStorage.getItem("isAuthenticated"));

    await expect(isAuthenticated).toBe("true");
  });
});
