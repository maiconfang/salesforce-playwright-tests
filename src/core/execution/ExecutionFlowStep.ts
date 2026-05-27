import { ExecutionFlowType } from "./ExecutionFlowType";

/**
 * Represents a single execution flow event generated during test execution.
 *
 * Each step describes a meaningful event that happened
 * while the test was running, such as:
 * - business flow transitions
 * - UI actions
 * - synchronization events
 * - successful operations
 * - failures and errors
 * - data interactions
 * - form values entered during execution
 *
 * ExecutionFlowStep is the core telemetry structure used
 * by the execution observability system.
 *
 * These events are persisted into execution-flow.json
 * and can later be used for:
 * - debugging
 * - execution timelines
 * - HTML reports
 * - root cause analysis
 * - flaky test investigation
 * - AI-powered analysis
 *
 * The goal of this structure is to provide
 * human-readable and machine-readable execution telemetry.
 */
export interface ExecutionFlowStep {

  type: ExecutionFlowType;

  message: string;

  timestamp: string;

  /**
   * Optional business or technical context.
   *
   * Examples:
   * - Authentication
   * - Lead Creation
   * - Contact Information
   */
  context?: string;

  durationMs?: number;

  error?: string;

  summary?: string;

  /**
   * Optional structured execution data.
   *
   * Examples:
   * - fieldName: "First Name"
   * - fieldValue: "Maicon"
   *
   * This information can later be used for:
   * - execution replay
   * - AI analysis
   * - HTML reports
   * - debugging
   * - forensic analysis
   */
  metadata?: {
    fieldName?: string;
    fieldValue?: string;
  };
}