/**
 * FailureJourney
 *
 * Represents the execution path that led to a test failure.
 *
 * This model provides business-oriented visibility into
 * where the failure occurred within a workflow.
 *
 * Current Information:
 *
 * - businessFlow       → business process being executed
 * - lastSuccessfulStep → last successfully completed step
 * - failedStep         → step where the failure occurred
 *
 * Example:
 *
 * {
 *   businessFlow: 'Filling Lead form',
 *   lastSuccessfulStep: 'Rating',
 *   failedStep: 'No. of Employees'
 * }
 *
 * Benefits:
 *
 * - Faster troubleshooting
 * - Better failure visibility
 * - Easier root cause investigation
 * - Improved dashboard diagnostics
 *
 * Current Usage:
 *
 * - execution-report.json
 * - Dashboard Failure View
 * - Failure Analysis
 * - Business Flow Diagnostics
 *
 * Future Evolution:
 *
 * Additional information may be introduced:
 *
 * - workflowId
 * - workflowType
 * - failedAction
 * - executionTimeline
 * - impactedComponents
 */

export interface FailureJourney {

    businessFlow: string;

    lastSuccessfulStep: string;

    failedStep: string;
}