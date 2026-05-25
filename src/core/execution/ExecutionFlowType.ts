/**
 * Defines the semantic categories used by the
 * execution observability system.
 *
 * Each execution event generated during test runtime
 * belongs to one of these flow types.
 *
 * These categories help organize execution telemetry
 * into meaningful operational layers, making the
 * execution flow easier to understand for both
 * humans and machines.
 *
 * The goal is to separate:
 * - business flow transitions
 * - user/system actions
 * - successful operations
 * - warnings
 * - failures
 *
 * These flow types are used by:
 * - execution-flow.json
 * - console telemetry logs
 * - future HTML reports
 * - AI analysis
 * - root cause analysis
 * - execution timelines
 */
export enum ExecutionFlowType {
  FLOW = "FLOW",
  ACTION = "ACTION",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
}