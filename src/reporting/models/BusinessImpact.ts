/**
 * BusinessImpact
 *
 * Represents the business impact associated with a failed test execution.
 *
 * This model provides business-oriented context that can be displayed
 * by dashboards, reports, and future AI analysis features.
 *
 * Current Information:
 *
 * - flow            → affected business flow
 * - failedStep      → step where the failure occurred
 * - recordsAffected → estimated number of impacted records
 *
 * Example:
 *
 * {
 *   flow: 'Lead Creation',
 *   failedStep: 'No. of Employees',
 *   recordsAffected: 1
 * }
 *
 * Future Evolution:
 *
 * Additional fields may be introduced to support:
 *
 * - impacted entities
 * - affected users
 * - business criticality
 * - risk assessment
 * - estimated business impact
 */

export interface BusinessImpact {

    flow: string;

    failedStep: string;

    recordsAffected: number;
}