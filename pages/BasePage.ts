import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async waitToastToDisappear(): Promise<void> {
    await this.page.locator('.toastMessage')
      .waitFor({ state: 'hidden' });
  }

  async waitUntilClickable(locator: Locator): Promise<void> {
    await expect(async () => {
      await locator.click({ trial: true });
    }).toPass();
  }
}