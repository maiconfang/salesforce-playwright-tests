import {
  test,
  expect,
  request,
} from "@playwright/test";

import { OpportunitiesClient }
  from "@clients/opportunities/OpportunitiesClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { OpportunityBuilder }
  from "@builders/OpportunityBuilder";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "should delete opportunity via Salesforce API",

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

      const opportunitiesClient =
        new OpportunitiesClient(
          apiContext,
          authClient,
        );

      const timestamp =
        new Date()
          .toISOString()
          .replace(/[:.]/g, "-");

      const opportunity =
        new OpportunityBuilder()

          .withName(
            `Opportunity Delete Test ${timestamp}`,
          )

          .withStageName(
            "Prospecting",
          )

          .withCloseDate(
            "2026-12-31",
          )

          .build();

      const createResponse =
        await opportunitiesClient.createOpportunity(
          opportunity,
        );

      expect(
        createResponse.id,
      ).toBeTruthy();

      const opportunityId =
        createResponse.id;

      const deleteResponse =
        await opportunitiesClient.deleteOpportunity(
          opportunityId,
        );

      expect(
        deleteResponse.status(),
      ).toBe(
        204,
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