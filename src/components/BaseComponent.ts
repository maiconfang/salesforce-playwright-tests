import { expect, Locator, Page } from "@playwright/test";

/**
 * BaseComponent
 *
 * Shared reusable behavior for UI components.
 *
 * Benefits:
 * - Centralized synchronization helpers
 * - Reduced duplicated code
 * - Better maintainability
 * - More scalable architecture
 */
export class BaseComponent {
  constructor(
    protected readonly page: Page,
  ) {}

  /**
   * Wait until locator becomes truly clickable.
   *
   * Useful for:
   * - Salesforce
   * - SPA applications
   * - Async rendering
   * - Animation delays
   */
  protected async waitUntilClickable(
    locator: Locator,
  ): Promise<void> {
    await expect(async () => {
      await locator.click({ trial: true });
    }).toPass();
  }
}
