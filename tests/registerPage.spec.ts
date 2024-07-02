import { expect } from "@playwright/test";
import { test } from "../fixtures/pages.fixture";
import { errorMessages } from "../errors/errorMessages";
import { pageRoutes } from "../routes/pageRoutes";
import "dotenv/config";

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageRoutes.regsiterPage);
  });

  test("Register page shout have correct form", async ({ registerPage }) => {
    const registerForm = await registerPage.registerForm;
    await expect(registerForm).toBeVisible();
  });

  test("User can not submit when email, fullName and password input is empty", async ({ registerPage }) => {
    const submitButton = await registerPage.registerSubmitButton;
    await submitButton.click();

    const emailInput = registerPage.page.locator("input#email-input[required]");

    await expect(emailInput).toBeVisible();
  });

  test("User can not submit when email input is empty", async ({ registerPage }) => {
    await registerPage.registerFullNameInput.fill("Play Wright");
    await registerPage.registerPasswordInput.fill("admin123");

    const submitButton = await registerPage.registerSubmitButton;
    await submitButton.click();

    const emailInput = registerPage.page.locator("input#email-input[required]");

    await expect(emailInput).toBeVisible();
  });

  test("User can not submit when fullName input is empty", async ({ registerPage }) => {
    await registerPage.registerMailInput.fill(process.env.userEmailLogin!);
    await registerPage.registerPasswordInput.fill(process.env.userPasswordLogin!);

    const submitButton = await registerPage.registerSubmitButton;
    await submitButton.click();

    const fullNameInput = registerPage.page.locator("input#fullName-input[required]");

    await expect(fullNameInput).toBeVisible();
  });

  test("User can not submit when password input is empty", async ({ registerPage }) => {
    await registerPage.registerMailInput.fill(process.env.userEmailLogin!);
    await registerPage.registerFullNameInput.fill("Play Wright");

    const submitButton = await registerPage.registerSubmitButton;
    await submitButton.click();

    const passwordInput = registerPage.page.locator("input#password-input[required]");

    await expect(passwordInput).toBeVisible();
  });

  test("User can not register when email is invalid", async ({ registerPage }) => {
    await registerPage.registerMailInput.fill("playWright-tester@hahahaha.com");
    await registerPage.registerFullNameInput.fill("Play Wright");
    await registerPage.registerPasswordInput.fill("admin123");

    const submitButton = await registerPage.registerSubmitButton;
    await submitButton.click();

    const errorMessage = registerPage.registerErrorMessage;

    await expect(errorMessage).toContainText(errorMessages.invalidEmail);
  });

  test("User can not register when email is already taken", async ({ registerPage }) => {
    await registerPage.registerMailInput.fill(process.env.userEmailLogin!);
    await registerPage.registerFullNameInput.fill("Play Wright");
    await registerPage.registerPasswordInput.fill(process.env.userPasswordLogin!);

    const submitButton = await registerPage.registerSubmitButton;
    await submitButton.click();

    const errorMessage = registerPage.registerErrorMessage;

    await expect(errorMessage).toContainText(errorMessages.userAlreadyExist);
  });

  // Test 1 keer runnen per maand (Werkt)
  test.skip("User can register", async ({ registerPage }) => {
    const randomNumber = Math.floor(Math.random() * 1000);

    await registerPage.registerMailInput.fill(`newPlayWright-tester${randomNumber}@gmail.com`);
    await registerPage.registerFullNameInput.fill("Play Wright");
    await registerPage.registerPasswordInput.fill(process.env.userPasswordLogin!);

    const submitButton = await registerPage.registerSubmitButton;
    await submitButton.click();

    await registerPage.page.waitForTimeout(2000);

    const isAuthenticated = await registerPage.page.evaluate(() => localStorage.getItem("isAuthenticated"));

    await expect(isAuthenticated).toBe("true");
  });
});
