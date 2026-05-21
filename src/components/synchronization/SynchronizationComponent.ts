import { expect, Locator, Page } from "@playwright/test";
import { BaseComponent } from "@components/BaseComponent";

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
  async waitUntilClickable(locator: Locator): Promise<void> {
    await expect(async () => {
      await locator.click({
        trial: true,
      });
    }).toPass();
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
