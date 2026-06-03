/**
 * ExecutionFlow
 *
 * Represents a single execution event captured during test execution.
 *
 * This model is the source of truth for execution context,
 * business flows, diagnostics, test data, and failure analysis.
 *
 * ExecutionFlow events are generated throughout the execution lifecycle
 * and persisted into:
 *
 * test-results/** /execution-flow.json
 *
 * Event Types:
 *
 * - FLOW
 * - ACTION
 * - SUCCESS
 * - DATA
 * - ERROR
 *
 * Examples:
 *
 * FLOW:
 * "Filling Lead form"
 *
 * ACTION:
 * "Clicking Save button"
 *
 * SUCCESS:
 * "Successfully clicked Save button"
 *
 * DATA:
 * {
 *   fieldName: "Company",
 *   fieldValue: "IT QA"
 * }
 *
 * ERROR:
 * {
 *   summary: "Timeout while waiting for element"
 * }
 *
 * Current Uses:
 *
 * - Failure Journey generation
 * - Root Cause Analysis
 * - Test Data extraction
 * - Business Impact analysis
 * - Execution diagnostics
 *
 * Future Uses:
 *
 * - Timeline visualization
 * - Quality Insights
 * - AI Analysis
 * - Agent-based investigations
 *
 * Architecture:
 *
 * execution-flow.json
 *          │
 *          ▼
 * ExecutionContextParser
 *          │
 *          ▼
 * execution-report.json
 */
export interface ExecutionFlow {

    type: string;

    message: string;

    timestamp: string;

    context?: string;

    summary?: string;

    error?: string;

    metadata?: Record<string, unknown>;

    executionContext?: string;

    technicalContext?: {

        locator?: string;

        timeout?: string;

        reason?: string;
    };

    originTestFile?: string;

    stackTraceSummary?: string[];
}