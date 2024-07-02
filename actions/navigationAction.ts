import { Page } from "@playwright/test";

export class NavigationAction {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPage(pageToNavigate: string): Promise<void> {
    await this.page.locator(`id=${pageToNavigate}-page-navigation-button`).click();
  }
}
