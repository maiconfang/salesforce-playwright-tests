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
  "should update a lead",

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

      const lead =
        new LeadBuilder()
          .withFirstName(
            "Maicon",
          )
          .withLastName(
            "Fang",
          )
          .withCompany(
            "OpenAI",
          )
          .build();

      const createResponse =
        await leadsClient.createLead(
          lead,
        );

      const leadId =
        createResponse.id;

      const updatedCompany =
        "OpenAI Updated";

      const updateResponse =
        await leadsClient.updateLead(
          leadId,
          {
            Company: updatedCompany,
          },
        );

      expect(
        updateResponse.status(),
      ).toBe(
        204,
      );

      const getResponse =
        await leadsClient.getLeadById(
          leadId,
        );

      const leadData =
        await getResponse.json();

      expect(
        leadData.Company,
      ).toBe(
        updatedCompany,
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