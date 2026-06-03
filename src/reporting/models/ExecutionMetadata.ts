/**
 * ExecutionMetadata
 *
 * Represents execution environment information associated
 * with a test run.
 *
 * This model provides contextual details about where and how
 * the execution was performed.
 *
 * Current Information:
 *
 * - browser     → browser used during execution
 * - environment → target environment
 * - baseUrl     → application base URL
 *
 * Example:
 *
 * {
 *   browser: 'chromium',
 *   environment: 'QA',
 *   baseUrl: 'https://myapp.com'
 * }
 *
 * Future Evolution:
 *
 * Additional metadata may be introduced to support:
 *
 * - execution date
 * - operating system
 * - device information
 * - execution region
 * - build version
 * - release version
 * - CI/CD pipeline details
 */
export interface ExecutionMetadata {

    browser: string;

    environment: string;

    baseUrl: string;
}