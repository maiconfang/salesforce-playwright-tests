import {
  test,
  expect,
  request,
} from "@playwright/test";

import { AccountsClient }
  from "@clients/accounts/AccountsClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { AccountBuilder }
  from "@builders/AccountBuilder";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "should create an account via Salesforce API",

  async ({}, testInfo) => {

    const executionContext =
      new TestExecutionContext(
        testInfo.outputDir,
      );

    ExecutionContextManager.setContext(
      executionContext,
    );

    let apiContext;

    try {

      apiContext =
        await request.newContext();

      const authClient =
        new SalesforceAuthClient();

      const accountsClient =
        new AccountsClient(
          apiContext,
          authClient,
        );

      const now =
        new Date();

      const formattedDate =
        `${now.getFullYear()}`
        + `-${String(now.getMonth() + 1).padStart(2, "0")}`
        + `-${String(now.getDate()).padStart(2, "0")}`
        + `-${String(now.getHours()).padStart(2, "0")}`
        + `-${String(now.getMinutes()).padStart(2, "0")}`;

      const account =
        new AccountBuilder()
          .withName(
            `OpenAI Account ${formattedDate}`,
          )
          .build();

      const response =
        await accountsClient.createAccount(
          account,
        );

      console.log(
        "Created Account:",
        JSON.stringify(
          response,
          null,
          2,
        ),
      );

      expect(
        response.id,
      ).toBeTruthy();

      expect(
        response.success,
      ).toBeTruthy();

    } catch (error) {

      executionContext.addError(
        error,
      );

      throw error;

    } finally {

      if (apiContext) {

        await apiContext.dispose();
      }

      executionContext.saveFlow();

      ExecutionContextManager.clear();
    }
  },
);