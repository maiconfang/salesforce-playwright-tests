import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    console.log('Navigating to Salesforce URL:', process.env.BASE_URL);
    console.log('Current page URL:', this.page.url());
    await this.page.goto('');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);

    await this.page.getByLabel('Password').fill(password);

    await this.page.getByRole('button', {
      name: 'Log In',
    }).click();
  }

  async expectSuccessfulLogin(): Promise<void> {
    await expect(this.page).not.toHaveURL(/login/);
  }
}