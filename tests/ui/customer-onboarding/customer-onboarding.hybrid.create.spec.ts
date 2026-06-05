import { test } from "@playwright/test";

import { CreateCustomerOnboardingHybridWorkflow }
  from "@orchestration/customer-onboarding/CreateCustomerOnboardingHybridWorkflow";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "Should create Customer Onboarding using Hybrid workflow",
  async ({}, testInfo) => {

    const executionContext =
      new TestExecutionContext(
        testInfo.outputDir,
      );

    ExecutionContextManager.setContext(
      executionContext,
    );

    try {

      const workflow =
        new CreateCustomerOnboardingHybridWorkflow();

      const result =
        await workflow.execute();

      console.log(
        "Customer Onboarding Result:",
        JSON.stringify(
          result,
          null,
          2,
        ),
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