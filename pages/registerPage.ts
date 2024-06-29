import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly registerForm: Locator;
  readonly registerMailInput: Locator;
  readonly registerFullNameInput: Locator;
  readonly registerPasswordInput: Locator;
  readonly registerSubmitButton: Locator;
  readonly registerErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerForm = page.locator("id=register-form");
    this.registerMailInput = page.locator("id=email-input");
    this.registerFullNameInput = page.locator("id=fullName-input");
    this.registerPasswordInput = page.locator("id=password-input");
    this.registerSubmitButton = page.locator("id=submit-button");
    this.registerErrorMessage = page.locator("id=form-error-message");
  }
}
