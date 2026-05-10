import { Page } from '@playwright/test';

export class LeadsPage {
  constructor(private page: Page) {}

  async openLeads(): Promise<void> {
    await this.page.getByText('Leads').click();
  }
}
