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
  "should update opportunity via Salesforce API",

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
            "Original opportunity description.",
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

      const updatedOpportunity =
        new OpportunityBuilder()

          .withName(
            `Updated Opportunity ${timestamp}`,
          )

          .withDescription(
            "Opportunity updated through Playwright API automation.",
          )

          .withStageName(
            "Qualification",
          )

          .withAmount(
            350000,
          )

          .withCloseDate(
            "2027-01-31",
          )

          .withNextStep(
            "Schedule executive review meeting",
          )

          .build();

      const updateResponse =
        await opportunitiesClient.updateOpportunity(
          opportunityId,
          updatedOpportunity,
        );

      expect(
        updateResponse.status(),
      ).toBe(204);

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
        "Updated Opportunity:",
        JSON.stringify(
          opportunityData,
          null,
          2,
        ),
      );

      expect(
        opportunityData.Name,
      ).toBe(
        updatedOpportunity.Name,
      );

      expect(
        opportunityData.Description,
      ).toBe(
        updatedOpportunity.Description,
      );

      expect(
        opportunityData.StageName,
      ).toBe(
        updatedOpportunity.StageName,
      );

      expect(
        opportunityData.Amount,
      ).toBe(
        updatedOpportunity.Amount,
      );

      expect(
        opportunityData.NextStep,
      ).toBe(
        updatedOpportunity.NextStep,
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