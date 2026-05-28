import { ParsedExecutionError } from "./ParsedExecutionError";

/**
 * ErrorInterpreter
 *
 * Responsibility:
 * - Interpret raw execution failures
 * - Transform technical errors into semantic telemetry
 * - Normalize noisy Playwright/runtime messages
 * - Enrich execution failures with contextual information
 *
 * Architecture Role:
 * - Centralized execution error interpreter
 * - Semantic observability layer
 * - Execution telemetry enrichment component
 *
 * Features:
 * - ANSI terminal character sanitization
 * - Error normalization
 * - Timeout detection
 * - Locator extraction
 * - Technical context extraction
 * - Human-readable execution summaries
 * - Simplified stack trace extraction
 *
 * Output Goals:
 * - Human-readable execution failures
 * - Machine-readable telemetry
 * - Better debugging visibility
 * - Future AI-powered analysis
 * - Explainable execution history
 *
 * Observability Strategy:
 * Raw runtime errors are transformed into:
 * - execution summaries
 * - contextual operational failures
 * - structured technical evidence
 * - simplified execution traces
 *
 * This component is intentionally heuristic-based
 * and designed to evolve incrementally as the
 * execution observability platform grows.
 */
export class ErrorInterpreter {

  static parse(
    error: unknown,
  ): ParsedExecutionError {

    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);

    const errorStack =
      error instanceof Error
        ? error.stack
        : undefined;

    const stackTraceSummary =
      ErrorInterpreter.parseStackTrace(
        errorStack,
      );

    const originTestFile =
      stackTraceSummary.find(
        entry =>
          entry.includes(".spec.ts"),
      );

    const sanitizedMessage =
      errorMessage

        // Remove ANSI terminal characters
        .replace(
          /\u001b\[[0-9;]*m/g,
          "",
        )

        // Replace line breaks with spaces
        .replace(/\n/g, " ")

        // Remove escaped quotes
        .replace(/\\"/g, "\"")

        // Normalize multiple spaces
        .replace(/\s+/g, " ")

        .trim();

    const simplifiedMessage =
      sanitizedMessage
        .split("\n")[0]
        .trim();

    /*
     * Heuristic:
     * Element not found
     */
    if (
      errorMessage.includes(
        "element(s) not found",
      )
    ) {

      return {

        message:
          simplifiedMessage,

        summary:
          "Expected visible element was not found on the page.",

        error:
          "element(s) not found",

        originTestFile,

        stackTraceSummary,

        technicalContext: {

          locator:
            sanitizedMessage.match(
              /Locator:\s(.+)/,
            )?.[1],

          timeout:
            sanitizedMessage.match(
              /Timeout:\s(.+)/,
            )?.[1],

          reason:
            "element(s) not found",
        },
      };
    }

    /*
     * Heuristic:
     * Timeout exceeded
     */
    if (
      errorMessage.toLowerCase().includes(
        "timeout",
      )
    ) {

      const locator =
        sanitizedMessage.match(
          /getByRole\([^)]+name:\s'([^']+)'/,
        )?.[1];

      return {

        message:
          sanitizedMessage,

        summary:
          locator
            ? `Timeout while waiting for "${locator}" to become visible.`
            : "Operation exceeded the expected timeout.",

        error:
          "timeout exceeded",

        originTestFile,

        stackTraceSummary,

        technicalContext: {

          locator:
            locator
              ? `getByRole('textbox', { name: '${locator}' })`
              : undefined,

          timeout:
            sanitizedMessage.match(
              /Timeout\s([0-9]+ms)/,
            )?.[1],

          reason:
            "Element did not become visible.",
        },
      };
    }

    /*
     * Fallback
     */
    return {

      message:
        errorMessage,

      summary:
        "Unexpected execution failure occurred.",

      error:
        errorMessage,

      originTestFile,

      stackTraceSummary,
    };
  }

  /**
   * Simplifies stack trace lines into
   * readable execution trace entries.
   */
  private static parseStackTrace(
    stack?: string,
  ): string[] {

    if (!stack) {
      return [];
    }

    return stack
      .split("\n")

      .filter(line =>
        line.includes(".ts:"),
      )

      .map(line => {

        const cleanedLine =
          line.trim();

        /*
         * Pattern:
         * at SomeClass.someMethod (File.ts:42:10)
         */
        const methodMatch =
          cleanedLine.match(
            /at\s(.+)\((.+):(\d+):(\d+)\)/,
          );

        if (methodMatch) {

          const fullMethod =
            methodMatch[1];

          const filePath =
            methodMatch[2];

          const lineNumber =
            methodMatch[3];

          const fileName =
            filePath.split("\\").pop();

          const normalizedMethod =
            fullMethod
              .replace(/^at\s/, "")
              .trim();

          return `${normalizedMethod} (${fileName}:${lineNumber})`;
        }

        /*
         * Pattern:
         * at \tests\ui\leads\leads.create.spec.ts:53:9
         */
        const testFileMatch =
          cleanedLine.match(
            /((\\|\/)tests(\\|\/).+\.spec\.ts:\d+:\d+)/,
          );

        if (testFileMatch) {

          return testFileMatch[1]
            .replace(/\//g, "\\");
        }

        return "";
      })

      .filter(Boolean);
  }
}