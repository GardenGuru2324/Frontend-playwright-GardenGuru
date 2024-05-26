import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';

type PageFixture = {
	homePage: HomePage;
};

export const test = base.extend<PageFixture>({
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	}
});
