import { test } from "@playwright/test";

import { CreateContactHybridWorkflow }
  from "@orchestration/contacts/CreateContactHybridWorkflow";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "Should create Contact using Hybrid workflow",
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
        new CreateContactHybridWorkflow(
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