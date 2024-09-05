import { Page, Locator } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly topSection: Locator;
  readonly profilePicture: Locator;
  readonly infoSection: Locator;
  readonly editProfilePictureButton: Locator;
  readonly logoutButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.topSection = page.locator("id=top-section-profile-page");
    this.profilePicture = page.locator("id=profile-picture");
    this.editProfilePictureButton = page.locator("id=edit-profile-picture-button");
    this.infoSection = page.locator("id=info-section-profile-page");
    this.logoutButton = page.locator("id=logout-button");
  }
}
