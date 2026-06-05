import { test } from "@playwright/test";

import { CreateOpportunityHybridWorkflow }
  from "@orchestration/opportunities/CreateOpportunityHybridWorkflow";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "Should create Opportunity using Hybrid workflow",
  async ({ page }, testInfo) => {

    const executionContext =
      new TestExecutionContext(
        testInfo.outputDir,
      );

    ExecutionContextManager.setContext(
      executionContext,
    );

    try {

      const workflow =
        new CreateOpportunityHybridWorkflow(
          page,
        );

      const result =
        await workflow.execute();

      console.log(
        "Hybrid Workflow Result:",
        result,
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