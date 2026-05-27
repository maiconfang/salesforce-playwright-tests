import { test as setup } from "@playwright/test";

import { LoginPage } from "@pages/LoginPage";

import { requiredEnv } from "@/utils/env";

import { TestExecutionContext } from "@/core/execution/TestExecutionContext";
import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";

setup(
  "authenticate",
  async ({ page }, testInfo) => {

    const executionContext =
      new TestExecutionContext(
        testInfo.outputDir,
      );

    ExecutionContextManager.setContext(
      executionContext,
    );

    try {

      const loginPage =
        new LoginPage(page);

      await loginPage.open();

      await loginPage.login(
        requiredEnv(
          "SALESFORCE_USERNAME",
        ),
        requiredEnv(
          "SALESFORCE_PASSWORD",
        ),
      );

      await loginPage.expectSuccessfulLogin();

      await page.context().storageState({
        path: "playwright/.auth/user.json",
      });

      executionContext.saveFlow();

    } finally {

      ExecutionContextManager.clear();
    }
  },
);