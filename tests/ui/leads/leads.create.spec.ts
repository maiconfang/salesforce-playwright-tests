import { test } from '@playwright/test';
import { LeadsPage } from '@pages/LeadsPage';
import { createLeadCancelTestData, leadTestData } from '@data/leads';
import { TestExecutionContext } from '@execution/TestExecutionContext';
import { ExecutionContextManager } from '@/core/execution/ExecutionContextManager';

/**
 * Leads Create Tests
 *
 * Purpose:
 * - Validates the Lead creation workflow
 * - Verifies Lead-related UI behaviors
 * - Exercises the enterprise Page Object architecture
 *
 * Execution Observability:
 * - Creates an isolated TestExecutionContext per test
 * - Registers the active execution context lifecycle
 * - Persists execution telemetry into execution-flow.json
 * - Supports contextual execution tracking
 * - Enables future AI-powered execution analysis
 *
 * Execution Lifecycle:
 * 1. Create TestExecutionContext
 * 2. Register context using ExecutionContextManager
 * 3. Execute business flow
 * 4. Persist execution telemetry
 * 5. Clear execution context
 */

test.describe('Leads Create', () => {

  test(
    'should create a new lead',
    async ({ page }, testInfo) => {

      const executionContext =
        new TestExecutionContext(
          testInfo.outputDir,
        );

      ExecutionContextManager.setContext(
        executionContext,
      );

      try {

        const leadsPage = new LeadsPage(page);

        await leadsPage.open();

        await leadsPage.openLeads();

        await leadsPage.createLead(
          leadTestData,
        );

        await leadsPage.expectLeadCreated(
          leadTestData,
        );

      } catch (error) {

        executionContext.addError(error);

        throw error;

      } finally {

        executionContext.saveFlow();

        ExecutionContextManager.clear();
      }
    },
  );

  test.skip('should display validation errors when required fields are empty', async ({
    page,
  }) => {
    const leadsPage = new LeadsPage(page);

    // await leadsPage.open();

    await leadsPage.openLeads();

    await leadsPage.openNewLeadForm();

    // await leadsPage.waitToastToDisappear();

    await leadsPage.saveLead();

    await leadsPage.expectValidationErrors([
      'Name',
      'Company',
    ]);
  });

  test.skip('should cancel lead creation without saving data', async ({ page }) => {
    const leadsPage = new LeadsPage(page);

    const leadCancelTestData = createLeadCancelTestData();

    // await leadsPage.open();

    await leadsPage.openLeads();

    await leadsPage.openNewLeadForm();

    // await leadsPage.waitToastToDisappear();

    await leadsPage.fill(leadCancelTestData);

    await leadsPage.cancelLeadCreation();


    await leadsPage.searchLead(
      leadCancelTestData.lastName,
    );

    await leadsPage.expectGlobalSearchNoResults(leadCancelTestData.lastName);
  });

});