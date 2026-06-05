import { test } from "@playwright/test";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";
import { CreateAccountHybridWorkflow } from "@/orchestration/accounts/createAccountHybridWorkflow";

test(
  "Should create Account using Hybrid workflow",
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
        new CreateAccountHybridWorkflow(
          page,
        );

      await workflow.execute();

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