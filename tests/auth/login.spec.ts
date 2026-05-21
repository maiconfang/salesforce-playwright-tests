// import { test } from '@playwright/test';
// import { requiredEnv } from '../../utils/env';
// import { LoginPage } from '@pages/LoginPage';

// test.use({ storageState: undefined });

// test('should login successfully into Salesforce', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.open();

//   await loginPage.login(
//     requiredEnv('SALESFORCE_USERNAME'),
//     requiredEnv('SALESFORCE_PASSWORD'),
//   );

//   await loginPage.expectSuccessfulLogin();
// });

// test('should show an error when username and password are invalid', async ({
//   page,
// }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.open();

//   await loginPage.login('invalid.username@example.com', 'invalid-password');

//   await loginPage.expectInvalidCredentialsError();
// });
