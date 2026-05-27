import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

import { Logger } from "@framework-utils/logger/Logger";

/**
 * ModalComponent
 *
 * Responsibility:
 * - Handle Salesforce modal behavior
 * - Open and close modal actions
 * - Validate modal visibility
 *
 * Benefits:
 * - Reusable modal behavior
 * - Cleaner page objects
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class ModalComponent extends BaseComponent {

  constructor(page: Page) {
    super(page);
  }

  /**
   * Validates modal heading visibility.
   */
  async expectHeadingVisible(
    heading: string,
  ): Promise<void> {

    Logger.debug(
      `Validating modal heading: ${heading}`,
    );

    await expect(
      this.page.getByRole("heading", {
        name: heading,
      }),
    ).toBeVisible();

    Logger.debug(
      `Modal heading visible: ${heading}`,
    );
  }

  /**
   * Clicks modal cancel button.
   */
  async cancel(): Promise<void> {

    const cancelButton: Locator =
      this.page.getByRole("button", {
        name: "Cancel",
        exact: true,
      });

    await expect(cancelButton)
      .toBeVisible();

    await this.uiActionsComponent.click(
      cancelButton,
      "Modal cancel button",
    );
  }
}