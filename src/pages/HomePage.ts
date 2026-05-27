import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

import { BasePage } from "@pages/BasePage";

import { Logger } from "@framework-utils/logger/Logger";

/**
 * HomePage
 *
 * Responsibility:
 * - Handle Salesforce home page behavior
 * - Validate application landing state
 *
 * Benefits:
 * - Cleaner test structure
 * - Reusable home page behavior
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class HomePage extends BasePage {

  private readonly sellerHomeText: Locator;

  constructor(page: Page) {

    super(page);

    this.sellerHomeText =
      this.page.getByText(
        "Seller Home",
      );
  }

  /**
   * Validates that the home page is loaded.
   */
  async expectLoaded(): Promise<void> {

    Logger.debug(
      "Validating Home page visibility",
    );

    await expect(
      this.sellerHomeText,
    ).toBeVisible();

    Logger.debug(
      "Home page loaded successfully",
    );
  }
}