import { expect } from '@playwright/test';
import { test } from '../fixtures/pages.fixture';

test.describe('New Todo', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://gardenguru.vercel.app/'); // Naar .env (Mischien preprod of Localhost)
	});

	test('Home Page shout have correct title', async ({ homePage }) => {
		const title = await homePage.title;
		await expect(title).toEqual('Garden Guru');
	});
});
