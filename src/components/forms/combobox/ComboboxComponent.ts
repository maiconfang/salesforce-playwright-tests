import { Page } from "@playwright/test";
import { BaseComponent } from "@components/BaseComponent";

/**
 * ComboboxComponent
 *
 * Responsibility:
 * - Handle Salesforce combobox interactions
 * - Open comboboxes
 * - Select options
 *
 * Benefits:
 * - Reusable combobox behavior
 * - Cleaner form components
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class ComboboxComponent extends BaseComponent {

  constructor(page: Page) {
    super(page);
  }

  async selectOption(
    label: string,
    option: string,
  ): Promise<void> {

    const combobox =
      this.page.getByRole("combobox", {
        name: label,
      });

    await this.uiActionsComponent.click(
      combobox,
      `${label} combobox`,
    );

    await this.page
      .getByRole("option", {
        name: option,
        exact: true,
      })
      .click();

    this.testExecutionContext.addData(
      label,
      option,
    );
  }
}