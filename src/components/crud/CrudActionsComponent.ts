import { Locator, Page } from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

/**
 * Encapsulates reusable CRUD actions.
 *
 * Responsibilities:
 * - Save actions
 * - Cancel actions
 * - Delete actions
 * - New record actions
 *
 * This component centralizes common CRUD interactions
 * used across Salesforce modules.
 */
export class CrudActionsComponent extends BaseComponent {


  private readonly saveButton: Locator;

  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);


    this.saveButton = this.page.getByRole("button", {
      name: /^Save$/i,
    });

    this.cancelButton = this.page.getByRole("button", {
      name: /^Cancel$/i,
    });
  }

  /**
   * Clicks the Save button.
   */
  async clickSave(): Promise<void> {

    await this.uiActionsComponent.click(
      this.saveButton,
      "Save button",
    );
  }

  /**
   * Clicks the Cancel button.
   */
  async clickCancel(): Promise<void> {
    await this.uiActionsComponent.click(
      this.cancelButton,
      "Cancel button",
    );
  }
}