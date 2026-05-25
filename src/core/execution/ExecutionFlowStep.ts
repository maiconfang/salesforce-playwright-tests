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

  context?: string;
  durationMs?: number;

  error?: string;
  summary?: string;
}