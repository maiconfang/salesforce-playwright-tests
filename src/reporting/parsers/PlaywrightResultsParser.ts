import fs from 'fs';
import path from 'path';

import { PlaywrightTestResult } from '@reporting/models/PlaywrightTestResult';

/**
 * PlaywrightResultsParser
 *
 * Responsibility:
 *
 * Parse the raw Playwright JSON report and extract
 * simplified execution results used by the reporting engine.
 *
 * Input:
 *
 * reports/raw/playwright-results.json
 *
 * Output:
 *
 * PlaywrightTestResult[]
 *
 * Current Responsibilities:
 *
 * - Read playwright-results.json
 * - Traverse Playwright suites recursively
 * - Extract test results
 * - Normalize execution status
 * - Build PlaywrightTestResult objects
 *
 * Extracted Information:
 *
 * - test name
 * - execution status
 * - duration
 * - project name
 *
 * Supported Statuses:
 *
 * - PASSED
 * - FAILED
 * - SKIPPED
 * - UNKNOWN
 *
 * Architecture:
 *
 * playwright-results.json
 *             │
 *             ▼
 * PlaywrightResultsParser
 *             │
 *             ▼
 * PlaywrightTestResult[]
 *             │
 *             ▼
 * ExecutionContextParser
 *
 * Notes:
 *
 * This parser is intentionally lightweight.
 *
 * It only extracts execution statistics and does not perform:
 *
 * - diagnostics
 * - failure analysis
 * - business flow analysis
 * - root cause detection
 *
 * Those responsibilities belong to:
 *
 * ExecutionContextParser
 *
 * Key Principle:
 *
 * playwright-results.json is the source of truth for:
 *
 * - test names
 * - status
 * - duration
 * - project information
 *
 * while execution-flow.json is the source of truth for:
 *
 * - execution context
 * - failure intelligence
 * - test data
 * - business impact
 *
 * Future Evolution:
 *
 * Additional information may be extracted:
 *
 * - retry information
 * - tags
 * - attachments
 * - screenshots
 * - trace references
 * - browser metadata
 */

export class PlaywrightResultsParser {

    public parse():
        PlaywrightTestResult[] {

        const reportFile =
            path.join(
                process.cwd(),
                'reports',
                'raw',
                'playwright-results.json'
            );

        const fileContent =
            fs.readFileSync(
                reportFile,
                'utf8'
            );

        const report =
            JSON.parse(
                fileContent
            );

        const results:
            PlaywrightTestResult[] = [];

        this.extractTests(
            report,
            results
        );

        return results;
    }


    private extractTests(
        node: any,
        results: PlaywrightTestResult[]
    ): void {

        if (!node) {

            return;
        }

        if (
            node.title
            &&
            Array.isArray(
                node.tests
            )
        ) {

            const test =
                node.tests[0];

            const result =
                test?.results?.[0];

            results.push({

                name:
                    node.title,

                status:
                    result?.status
                        ?.toUpperCase()
                    ?? 'UNKNOWN',

                duration:
                    result?.duration
                    ?? 0,

                project:
                    test?.projectName
                    ?? 'UNKNOWN'
            });
        }

        if (
            Array.isArray(
                node.suites
            )
        ) {

            for (
                const suite
                of node.suites
            ) {

                this.extractTests(
                    suite,
                    results
                );
            }
        }

        if (
            Array.isArray(
                node.specs
            )
        ) {

            for (
                const spec
                of node.specs
            ) {

                this.extractTests(
                    spec,
                    results
                );
            }
        }
    }





}