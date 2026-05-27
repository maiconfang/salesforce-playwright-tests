import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

import { Logger } from "@framework-utils/logger/Logger";

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
  private get toast(): Locator {

    return this.page.locator(
      ".toastMessage",
    );
  }

  /**
   * Waits until toast disappears.
   */
  async waitDisappear(): Promise<void> {

    Logger.debug(
      "Waiting for toast to disappear",
    );

    await this.toast.waitFor({
      state: "hidden",
    });

    Logger.debug(
      "Toast disappeared",
    );
  }

  /**
   * Validates if toast is visible.
   */
  async expectVisible(): Promise<void> {

    Logger.debug(
      "Validating toast visibility",
    );

    await expect(this.toast)
      .toBeVisible();

    Logger.debug(
      "Toast is visible",
    );
  }

  /**
   * Validates toast message.
   */
  async expectMessage(
    expectedMessage: RegExp | string,
  ): Promise<void> {

    Logger.debug(
      `Validating toast message: ${expectedMessage}`,
    );

    await expect(this.toast)
      .toHaveText(expectedMessage);

    Logger.debug(
      "Toast message validated successfully",
    );
  }

  /**
   * Returns current toast text.
   */
  async getMessage(): Promise<string> {

    Logger.debug(
      "Retrieving toast message",
    );

    const message =
      await this.toast.innerText();

    Logger.debug(
      `Toast message retrieved: ${message}`,
    );

    return message;
  }
}