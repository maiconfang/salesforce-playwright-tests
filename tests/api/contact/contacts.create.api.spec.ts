import {
  test,
  expect,
  request,
} from "@playwright/test";

import { ContactsClient }
  from "@clients/contacts/ContactsClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { ContactBuilder }
  from "@builders/ContactBuilder";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "should create a contact via Salesforce API",

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

      const contactsClient =
        new ContactsClient(
          apiContext,
          authClient,
        );

      const contact =
        new ContactBuilder()
          .withFirstName(
            "Maicon",
          )
          .withLastName(
            "Fang",
          )
          .build();

      const response =
        await contactsClient.createContact(
          contact,
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