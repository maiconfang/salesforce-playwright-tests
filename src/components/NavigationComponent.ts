import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

/**
 * NavigationComponent
 *
 * Responsibility:
 * - Handle Salesforce top navigation
 * - Open Salesforce tabs/modules
 * - Synchronize navigation behavior
 *
 * Benefits:
 * - Reusable navigation behavior
 * - Cleaner page objects
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class NavigationComponent extends BaseComponent {

  constructor(page: Page) {
    super(page);
  }

  /**
   * Opens a Salesforce tab/module.
   */
  async openTab(
    tabName: string,
  ): Promise<void> {

    const tab: Locator =
      this.page.getByRole("link", {
        name: tabName,
        exact: true,
      });

    await expect(tab)
      .toBeVisible();

    await this.uiActionsComponent.click(
      tab,
      `${tabName} navigation tab`,
    );
  }
}