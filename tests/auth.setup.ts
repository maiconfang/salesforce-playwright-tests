import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { requiredEnv } from '../utils/env';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    requiredEnv('SALESFORCE_USERNAME'),
    requiredEnv('SALESFORCE_PASSWORD'),
  );

  await loginPage.expectSuccessfulLogin();

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});
