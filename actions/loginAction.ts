import { Locator, Page } from "@playwright/test";

export class LoginPageAction {
  readonly page: Page;
  readonly loginMailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginMailInput = page.locator("id=email-input");
    this.loginPasswordInput = page.locator("id=password-input");
    this.loginSubmitButton = page.locator("id=submit-button");
  }

  async loginPlayWrightTestuser(): Promise<void> {
    await this.loginMailInput.fill("playWright-tester@gmail.com");
    await this.loginPasswordInput.fill("admin123");

    await this.loginSubmitButton.click();

    await this.page.waitForTimeout(1000);
  }
}
