import fs from "fs";
import path from "path";
import { ExecutionFlowStep } from "./ExecutionFlowStep";
import { ExecutionFlowType } from "./ExecutionFlowType";
import { ErrorInterpreter } from "./ErrorInterpreter";

/**
 * Represents the active execution context of a single test run. 
 *
 * This class is responsible for collecting, storing,
 * and persisting structured execution telemetry generated
 * during test execution.
 *
 * Each test execution owns its own isolated
 * TestExecutionContext instance, allowing the framework
 * to safely support:
 * - parallel execution
 * - execution isolation
 * - contextual telemetry
 * - execution observability
 *
 * The execution context stores semantic execution events
 * such as:
 * - business flow transitions
 * - UI actions
 * - successful operations
 * - warnings
 * - failures and errors
 * - execution data interactions
 *
 * These events are persisted into execution-flow.json
 * and can later be consumed by:
 * - HTML reports
 * - execution timelines
 * - root cause analysis
 * - AI-powered analysis
 * - flaky test investigation
 * - observability dashboards
 *
 * This class acts as the main telemetry engine
 * of the execution observability system.
 */
export class TestExecutionContext {

  private steps: ExecutionFlowStep[] = [];

  constructor(
    private outputDirectory: string,
  ) { }

  addStep(
    type: ExecutionFlowType,
    message: string,
    context?: string,
    summary?: string,
    error?: string,
    metadata?: Record<string, unknown>,
  ): void {

    this.steps.push({
      type,
      message,
      timestamp: new Date().toLocaleString(
        "sv-SE",
      ),
      context,
      summary,
      error,
      metadata,
    });

    const currentTime =
      new Date().toLocaleTimeString(
        "sv-SE",
      );

    console.log(
      `[${currentTime}] [${type}] ${message}`,
    );
  }

  /**
   * Adds structured execution data telemetry.
   *
   * This method is responsible for storing
   * business-relevant execution values such as:
   * - form inputs
   * - selected combobox values
   * - generated identifiers
   * - execution parameters
   *
   * These events help improve:
   * - debugging
   * - execution replay
   * - AI analysis
   * - HTML reports
   * - forensic analysis
   */
  addData(
    fieldName: string,
    fieldValue: string,
    context?: string,
    sensitive = false,
  ): void {

    const safeValue =
      sensitive
        ? "********"
        : fieldValue;

    this.addStep(
      ExecutionFlowType.DATA,
      `${fieldName} = ${safeValue}`,
      context,
      undefined,
      undefined,
      {
        fieldName,
        fieldValue: safeValue,
      },
    );
  }

  /**
   * Adds structured execution error telemetry.
   *
   * This method is responsible for storing
   * semantic execution failures generated
   * during test execution.
   *
   * The goal is to provide:
   * - human-readable error summaries
   * - structured failure telemetry
   * - better debugging visibility
   * - future AI-powered analysis
   */
  addError(
    error: unknown,
  ): void {

    const parsedError =
      ErrorInterpreter.parse(error);

    const lastFlowStep =
      this.steps
        .filter(step =>
          step.type === ExecutionFlowType.FLOW,
        )
        .at(-1);

    this.steps.push({

      type: ExecutionFlowType.ERROR,

      message: parsedError.message,

      timestamp: new Date().toLocaleString(
        "sv-SE",
      ),

      summary:
        parsedError.summary,

      error:
        parsedError.error,

      executionContext:
        lastFlowStep?.message,

      technicalContext:
        parsedError.technicalContext,

      originTestFile:
        parsedError.originTestFile,

      stackTraceSummary:
        parsedError.stackTraceSummary,

        
    });
  }

  saveFlow(): void {

    const filePath = path.join(
      this.outputDirectory,
      "execution-flow.json",
    );

    if (!fs.existsSync(this.outputDirectory)) {

      fs.mkdirSync(
        this.outputDirectory,
        { recursive: true },
      );
    }

    fs.writeFileSync(
      filePath,
      JSON.stringify(
        this.steps,
        null,
        2,
      ),
      "utf-8",
    );

    console.log(
      `[FLOW] Execution flow saved to: ${filePath}`,
    );
  }

  clear(): void {

    this.steps = [];
  }
}