import { expect, Page } from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

/**
 * NumberInputComponent
 *
 * Responsibility:
 * - Handle numeric input interactions
 * - Fill numeric fields
 * - Validate numeric values
 * - Clear numeric fields
 *
 * Benefits:
 * - Reusable numeric field behavior
 * - Cleaner form components
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class NumberInputComponent extends BaseComponent {

  constructor(page: Page) {
    super(page);
  }

  async fill(
    label: string,
    value: string,
  ): Promise<void> {

    const numberInput =
      this.page.getByRole("spinbutton", {
        name: label,
      });

    await this.uiActionsComponent.click(
      numberInput,
      `${label} number input`,
    );

    await this.uiActionsComponent.fill(
      numberInput,
      value,
      `${label} number input`,
    );

    this.testExecutionContext.addData(
      label,
      value,
    );
  }

  async clear(
    label: string,
  ): Promise<void> {

    const numberInput =
      this.page.getByRole("spinbutton", {
        name: label,
      });

    await this.uiActionsComponent.clear(
      numberInput,
      `${label} number input`,
    );
  }

  async expectValue(
    label: string,
    expectedValue: string,
  ): Promise<void> {

    const numberInput =
      this.page.getByRole("spinbutton", {
        name: label,
      });

    await expect(numberInput)
      .toHaveValue(expectedValue);
  }
}