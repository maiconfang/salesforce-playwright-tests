import { test } from "@playwright/test";

import { LeadsPage }
  from "@pages/LeadsPage";

import {
  createLeadCancelTestData,
  leadTestData,
} from "@test-data/leads";


import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";
import { createExecutionContext } from "@api/helpers/createExecutionContext";

test.describe("Leads Create", () => {

  test(
    "should create a new lead",
    async ({ page }, testInfo) => {

      const executionContext =
        createExecutionContext(
          testInfo,
        );

      try {

        const leadsPage =
          new LeadsPage(page);

        await leadsPage.open();

        await leadsPage.openLeads();

        await leadsPage.createLead(
          leadTestData,
        );

        await leadsPage.expectLeadCreated(
          leadTestData,
        );

      } catch (error) {

        executionContext.addError(
          error,
        );

        throw error;

      } finally {

        executionContext.saveFlow();

        ExecutionContextManager.clear();

      }
    },
  );

  test.skip(
    "should display validation errors when required fields are empty",
    async ({ page }) => {

      const leadsPage =
        new LeadsPage(page);

      await leadsPage.openLeads();

      await leadsPage.openNewLeadForm();

      await leadsPage.saveLead();

      await leadsPage.expectValidationErrors([
        "Name",
        "Company",
      ]);
    },
  );

  test.skip(
    "should cancel lead creation without saving data",
    async ({ page }) => {

      const leadsPage =
        new LeadsPage(page);

      const leadCancelTestData =
        createLeadCancelTestData();

      await leadsPage.openLeads();

      await leadsPage.openNewLeadForm();

      await leadsPage.fill(
        leadCancelTestData,
      );

      await leadsPage.cancelLeadCreation();

      await leadsPage.searchLead(
        leadCancelTestData.lastName,
      );

      await leadsPage.expectGlobalSearchNoResults(
        leadCancelTestData.lastName,
      );
    },
  );

});