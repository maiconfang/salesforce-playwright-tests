import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { requiredEnv } from '../../utils/env';

test('should login successfully into Salesforce', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    requiredEnv('SALESFORCE_USERNAME'),
    requiredEnv('SALESFORCE_PASSWORD'),
  );

  await loginPage.expectSuccessfulLogin();
});
