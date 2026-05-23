import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "@components/BaseComponent";
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
  /**
   * Waits until locator becomes clickable.
   */
  async waitUntilClickable(
    locator: Locator,
    locatorName?: string,
  ): Promise<void> {

    Logger.debug(
      `Waiting for locator: ${locatorName ?? "unknown"}`
    );

    await locator.waitFor({
      state: "visible",
      timeout: 30000,
    });

    Logger.debug(
      `Locator visible: ${locatorName ?? "unknown"}`
    );

    await expect(async () => {

      await locator.click({
        trial: true,
      });

    }).toPass({
      timeout: 30000,
    });

    Logger.debug(
      `Locator clickable: ${locatorName ?? "unknown"}`
    );
  }

  /**
   * Waits until loading spinner disappears.
   */
  async waitLoadingDisappear(): Promise<void> {
    const spinner = this.page.locator(".slds-spinner");

    if ((await spinner.count()) > 0) {
      await spinner.first().waitFor({
        state: "hidden",
      });
    }
  }
}
