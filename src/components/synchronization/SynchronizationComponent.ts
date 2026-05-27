import { expect, Locator, Page } from "@playwright/test";

import { Logger } from "@framework-utils/logger/Logger";

/**
 * SynchronizationComponent
 *
 * Responsibility:
 * - Handle reusable synchronization behavior
 * - Stabilize async UI interactions
 * - Reduce flaky tests
 *
 * Benefits:
 * - Better test stability
 * - Reusable synchronization logic
 * - Cleaner components
 * - Enterprise-style architecture
 */
export class SynchronizationComponent {

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Waits until locator becomes clickable.
   */
  async waitUntilClickable(
    locator: Locator,
    locatorName?: string,
  ): Promise<void> {

    const elementName =
      locatorName ?? "Unknown locator";

    Logger.debug(
      `Waiting for locator: ${elementName}`,
    );

    await locator.waitFor({
      state: "visible",
      timeout: 30000,
    });

    Logger.debug(
      `Locator visible: ${elementName}`,
    );

    await expect(async () => {

      await locator.click({
        trial: true,
      });

    }).toPass({
      timeout: 30000,
    });

    Logger.debug(
      `Locator clickable: ${elementName}`,
    );
  }

  /**
   * Waits until loading spinner disappears.
   */
  async waitLoadingDisappear(): Promise<void> {

    const spinner =
      this.page.locator(".slds-spinner");

    if ((await spinner.count()) > 0) {

      Logger.debug(
        "Waiting for loading spinner to disappear",
      );

      await spinner.first().waitFor({
        state: "hidden",
      });

      Logger.debug(
        "Loading spinner disappeared",
      );
    }
  }
}