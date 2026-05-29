import {
  test,
  expect,
  request,
} from "@playwright/test";

import { LeadsClient }
  from "@clients/leads/LeadsClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { LeadBuilder }
  from "@builders/LeadBuilder";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "should create a lead via Salesforce API",

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

      const leadsClient =
        new LeadsClient(
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

      const lead =
        new LeadBuilder()
          .withFirstName(
            `Maicon ${formattedDate}`,
          )
          .withLastName(
            "Fang",
          )
          .withCompany(
            "OpenAI",
          )
          .build();

      const response =
        await leadsClient.createLead(
          lead,
        );

      console.log(
        "Created Lead:",
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