import { Page, Locator } from '@playwright/test';

export class HomePage {
	readonly page: Page;
	readonly title: Promise<string>;

	constructor(page: Page) {
		this.page = page;
		this.title = page.title();
	}
}
