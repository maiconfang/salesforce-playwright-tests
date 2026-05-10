import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Seller Home')).toBeVisible();
  }
}
