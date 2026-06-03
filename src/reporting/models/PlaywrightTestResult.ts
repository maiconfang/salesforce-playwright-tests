/**
 * PlaywrightTestResult
 *
 * Represents a simplified test result extracted from
 * playwright-results.json.
 *
 * This model serves as the initial reporting contract
 * produced by PlaywrightResultsParser before additional
 * execution context and diagnostics are applied.
 *
 * Current Information:
 *
 * - name     → test name
 * - status   → execution status
 * - duration → execution duration in milliseconds
 * - project  → Playwright project name
 *
 * Example:
 *
 * {
 *   name: 'should create a new lead',
 *   status: 'FAILED',
 *   duration: 51652,
 *   project: 'chromium'
 * }
 *
 * Current Usage:
 *
 * - PlaywrightResultsParser
 * - ExecutionContextParser
 * - ExecutionReport generation
 *
 * Supported Statuses:
 *
 * - PASSED
 * - FAILED
 * - SKIPPED
 *
 * Architecture:
 *
 * playwright-results.json
 *            │
 *            ▼
 * PlaywrightResultsParser
 *            │
 *            ▼
 * PlaywrightTestResult
 *            │
 *            ▼
 * ExecutionContextParser
 *
 * Future Evolution:
 *
 * Additional information may be introduced:
 *
 * - retry count
 * - browser version
 * - execution tags
 * - suite name
 * - test file
 * - attachments
 */

export interface PlaywrightTestResult {

    name: string;

    status: string;

    duration: number;

    project: string;
}