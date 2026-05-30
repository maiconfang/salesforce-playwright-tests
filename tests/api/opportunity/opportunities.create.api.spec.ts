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
  "should create opportunity via Salesforce API",

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
            `OpenAI Enterprise Contract ${timestamp}`,
          )

          .withDescription(
            "Opportunity created through Playwright API automation.",
          )

          .withStageName(
            "Prospecting",
          )

          .withAmount(
            250000,
          )

          .withCloseDate(
            "2026-12-31",
          )

          .withNextStep(
            "Present proposal to customer and schedule follow-up meeting",
          )

          .withType(
            "New Customer",
          )

          .withLeadSource(
            "Web",
          )

          .build();

      const response =
        await opportunitiesClient.createOpportunity(
          opportunity,
        );

      console.log(
        "Created Opportunity:",
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