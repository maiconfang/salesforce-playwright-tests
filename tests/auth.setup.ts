import { test as setup } from '@playwright/test';
import { requiredEnv } from '../utils/env';
import { LoginPage } from '@pages/LoginPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(
    requiredEnv('SALESFORCE_USERNAME'),
    requiredEnv('SALESFORCE_PASSWORD'),
  );

  await loginPage.expectSuccessfulLogin();

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});
