import { Page } from "@playwright/test";
import { errorMessages } from "../errors/errorMessages";

export const mockApiResponse = async (statusCode: number, route: string, page: Page) => {
  await page.route(route, async (route) => {
    await route.fulfill({
      status: statusCode,
      body: JSON.stringify(errorMessages.userHasNoPlants), // Dit kan weg als er een id staat
    });
  });
};
