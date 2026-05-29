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
  "should get an account by id",

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

      const account =
        new AccountBuilder()
          .withName(
            "OpenAI Test Account",
          )
          .build();

      const createResponse =
        await accountsClient.createAccount(
          account,
        );

      const accountId =
        createResponse.id;

      const getResponse =
        await accountsClient.getAccountById(
          accountId,
        );

      const accountData =
        await getResponse.json();

      expect(
        accountData.Id,
      ).toBe(
        accountId,
      );

      expect(
        accountData.Name,
      ).toBe(
        "OpenAI Test Account",
      );

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