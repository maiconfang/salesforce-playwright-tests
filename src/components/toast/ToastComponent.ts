
import { expect, Page } from "@playwright/test";
import { BaseComponent } from "@components/BaseComponent";

/**
 * ToastComponent
 *
 * Responsibility:
 * - Handle Salesforce toast notifications
 * - Validate toast messages
 * - Synchronize toast behavior
 *
 * Benefits:
 * - Reusable toast behavior
 * - Cleaner page objects
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class ToastComponent extends BaseComponent {

  constructor(page: Page) {
    super(page);
  }

  /**
   * Returns the toast locator.
   */
  private get toast() {
    return this.page.locator(
      ".toastMessage",
    );
  }

  /**
   * Waits until toast disappears.
   */
  async waitDisappear(): Promise<void> {
    await this.toast.waitFor({
      state: "hidden",
    });
  }

  /**
   * Validates if toast is visible.
   */
  async expectVisible(): Promise<void> {
    await expect(this.toast)
      .toBeVisible();
  }

  /**
   * Validates toast message.
   */
  async expectMessage(
    expectedMessage: RegExp | string,
  ): Promise<void> {

    await expect(this.toast)
      .toHaveText(expectedMessage);
  }

  /**
   * Returns current toast text.
   */
  async getMessage(): Promise<string> {
    return await this.toast.innerText();
  }
}

