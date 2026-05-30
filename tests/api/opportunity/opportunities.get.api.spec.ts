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
  "should retrieve opportunity by id via Salesforce API",

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
            "Opportunity created for GET validation.",
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
            "Present proposal to customer",
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

      const getResponse =
        await opportunitiesClient.getOpportunityById(
          opportunityId,
        );

      expect(
        getResponse.status(),
      ).toBe(200);

      const opportunityData =
        await getResponse.json();

      console.log(
        "Retrieved Opportunity:",
        JSON.stringify(
          opportunityData,
          null,
          2,
        ),
      );

      expect(
        opportunityData.Id,
      ).toBe(
        opportunityId,
      );

      expect(
        opportunityData.Name,
      ).toBe(
        opportunity.Name,
      );

      expect(
        opportunityData.StageName,
      ).toBe(
        opportunity.StageName,
      );

      expect(
        opportunityData.Amount,
      ).toBe(
        opportunity.Amount,
      );

      expect(
        opportunityData.Description,
      ).toBe(
        opportunity.Description,
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