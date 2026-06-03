/**
 * TestData
 *
 * Represents a field/value pair captured during test execution.
 *
 * This model provides visibility into the data used by the test
 * and helps correlate failures with the business information
 * involved during execution.
 *
 * Current Information:
 *
 * - field → field name captured during execution
 * - value → value associated with the field
 *
 * Example:
 *
 * {
 *   field: 'Company',
 *   value: 'IT QA'
 * }
 *
 * Benefits:
 *
 * - Faster debugging
 * - Easier failure reproduction
 * - Better execution traceability
 * - Improved failure investigation
 *
 * Current Usage:
 *
 * - execution-report.json
 * - Failure Analysis
 * - Dashboard Test Data View
 * - Business Context Visualization
 *
 * Data Source:
 *
 * execution-flow.json
 *
 * Typically extracted from DATA events generated during
 * test execution.
 *
 * Future Evolution:
 *
 * Additional information may be introduced:
 *
 * - fieldType
 * - originalValue
 * - maskedValue
 * - sourceComponent
 * - validationStatus
 */

export interface TestData {

    field: string;

    value: string;
}