import { ReportGenerator } from '@reporting/generators/ReportGenerator';

/**
 * Reporting Engine Entry Point
 *
 * Responsibility:
 *
 * Bootstrap the reporting process and generate
 * the final execution-report.json artifact.
 *
 * Workflow:
 *
 * ReportGenerator
 *        │
 *        ▼
 * ExecutionContextParser
 *        │
 *        ▼
 * ExecutionReport
 *        │
 *        ▼
 * execution-report.json
 *
 * Output:
 *
 * reports/latest/execution-report.json
 *
 * Execution:
 *
 * npm run report
 *
 * Notes:
 *
 * This file contains no reporting logic.
 *
 * Its sole responsibility is to start the
 * report generation process.
 *
 * Architecture:
 *
 * Entry Point
 *        │
 *        ▼
 * ReportGenerator
 *        │
 *        ▼
 * Reporting Engine
 */
const generator =
    new ReportGenerator();

generator.generate();

console.log(
    'Report generated successfully.'
);