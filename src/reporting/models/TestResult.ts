import { FailureJourney } from '@reporting/models/FailureJourney';
import { TestData } from '@reporting/models/TestData';
import { BusinessImpact } from '@reporting/models/BusinessImpact';

/**
 * TestResult
 *
 * Represents the result of a single test execution within
 * the Quality Dashboard reporting model.
 *
 * This model combines execution status, diagnostics,
 * failure intelligence, business context, and recommendations
 * into a unified structure.
 *
 * Data Sources:
 *
 * - playwright-results.json
 * - execution-flow.json
 *
 * Current Information:
 *
 * Basic Execution:
 *
 * - name
 * - status
 * - duration
 *
 * Diagnostics:
 *
 * - error
 * - executionContext
 * - locator
 * - timeout
 * - stackTraceSummary
 *
 * Failure Intelligence:
 *
 * - rootCause
 * - severity
 * - recommendation
 *
 * Business Context:
 *
 * - failureJourney
 * - testData
 * - businessImpact
 *
 * Example:
 *
 * {
 *   name: 'should create a new lead',
 *   status: 'FAILED',
 *   duration: 51652,
 *   rootCause: 'LOCATOR_FAILURE',
 *   severity: 'HIGH'
 * }
 *
 * Dashboard Usage:
 *
 * This model is the primary source used to display:
 *
 * - failed tests
 * - failure details
 * - root causes
 * - recommendations
 * - business flows
 * - test data
 * - impact analysis
 *
 * Architecture:
 *
 * Playwright Result
 *          +
 * Execution Context
 *          ↓
 *      TestResult
 *
 * Future Evolution:
 *
 * Additional information may be introduced:
 *
 * - screenshots
 * - trace links
 * - timeline
 * - tags
 * - categories
 * - impacted components
 * - aiAnalysis
 *
 * Key Principle:
 *
 * A TestResult should provide enough information for a QA
 * engineer to understand a failure without needing to open
 * Playwright raw artifacts.
 */
export interface TestResult {

    name: string;

    status: string;

    duration: number;

    error?: string;

    executionContext?: string;

    locator?: string;

    timeout?: string;

    stackTraceSummary?: string[];

    rootCause?: string;

    severity?: string;

    recommendation?: string;

    failureJourney?: FailureJourney;

    testData?: TestData[];

    businessImpact?: BusinessImpact;
}