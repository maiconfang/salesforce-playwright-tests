import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
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
