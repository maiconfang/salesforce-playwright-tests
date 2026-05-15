import { expect, Page } from '@playwright/test';

/**
 * Reusable Salesforce top navigation component.
 */
export class NavigationComponent {
  constructor(private readonly page: Page) {}

  async openTab(tabName: string): Promise<void> {
    const tab = this.page.getByRole('link', {
      name: tabName,
      exact: true,
    });

    await expect(tab).toBeVisible();

    await tab.click();
  }
}