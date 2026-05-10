import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.only('should login successfully into Salesforce', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    process.env.SALESFORCE_USERNAME ?? '',
    process.env.SALESFORCE_PASSWORD ?? '',
  );

  await loginPage.expectSuccessfulLogin();
});