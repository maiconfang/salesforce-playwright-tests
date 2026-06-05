import { TestInfo } from "@playwright/test";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

export function createExecutionContext(
  testInfo: TestInfo,
): TestExecutionContext {

  const executionContext =
    new TestExecutionContext(
      testInfo.outputDir,
    );

  ExecutionContextManager.setContext(
    executionContext,
  );

  return executionContext;
}