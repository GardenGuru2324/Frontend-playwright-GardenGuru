import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginForm: Locator;
  readonly loginMailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = page.locator("id=login-form");
    this.loginMailInput = page.locator("id=email-input");
    this.loginPasswordInput = page.locator("id=password-input");
    this.loginSubmitButton = page.locator("id=submit-button");
    this.loginErrorMessage = page.locator("id=form-error-message");
  }
}
