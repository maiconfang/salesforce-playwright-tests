import { TestExecutionContext } from "./TestExecutionContext";

/**
 * Manages the active execution context for the current test execution.
 *
 * This class acts as a centralized access point for the
 * current TestExecutionContext during test runtime.
 *
 * Its main responsibility is to allow different layers
 * of the framework (pages, components, actions, etc.)
 * to register execution flow events without needing
 * to manually pass the context through every method.
 *
 * This approach helps keep the framework:
 * - cleaner
 * - more modular
 * - easier to maintain
 * - execution-context aware
 *
 * Each Playwright test execution should:
 * 1. create a TestExecutionContext
 * 2. register it using setContext()
 * 3. clear it after execution
 *
 * The execution context is used to:
 * - store execution flow events
 * - generate execution-flow.json
 * - persist telemetry data
 * - support future observability and AI analysis features
 */
export class ExecutionContextManager {

  private static currentContext?:
    TestExecutionContext;

  static setContext(
    context: TestExecutionContext,
  ): void {

    this.currentContext = context;
  }

  static getContext():
    TestExecutionContext {

    if (!this.currentContext) {

      throw new Error(
        "Execution context was not initialized.",
      );
    }

    return this.currentContext;
  }

  static clear(): void {

    this.currentContext = undefined;
  }
}