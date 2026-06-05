import { test } from "@playwright/test";

import { CreateTaskHybridWorkflow }
  from "@orchestration/tasks/CreateTaskHybridWorkflow";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "Should create Task using Hybrid workflow",
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
        new CreateTaskHybridWorkflow(
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