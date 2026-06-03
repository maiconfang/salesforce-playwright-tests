
import fs from 'fs';
import path from 'path';

import { ExecutionReport } from '@reporting/models/ExecutionReport';
import { ExecutionFlow } from '@reporting/models/ExecutionFlow';

import { PlaywrightResultsParser } from '@reporting/parsers/PlaywrightResultsParser';
import { FailureJourney } from '@reporting/models/FailureJourney';
import { TestData } from '@reporting/models/TestData';
import { BusinessImpact } from '@reporting/models/BusinessImpact';

/**
 * ExecutionContextParser
 *
 * Responsibility:
 *
 * Build the final ExecutionReport by combining
 * Playwright execution results with execution context
 * captured during test execution.
 *
 * This class represents the intelligence layer of the
 * Quality Dashboard reporting engine.
 *
 * Data Sources:
 *
 * - playwright-results.json
 * - execution-flow.json
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
 *             │
 *             ▼
 * ExecutionReport
 *             │
 *             ▼
 * execution-report.json
 *
 * Core Responsibilities:
 *
 * - Correlate execution results
 * - Process execution-flow events
 * - Generate failure diagnostics
 * - Build Failure Journey
 * - Extract Test Data
 * - Generate Business Impact
 * - Calculate execution statistics
 * - Build ExecutionReport
 *
 * Failure Intelligence:
 *
 * This class is responsible for generating:
 *
 * - Root Cause Analysis
 * - Severity Classification
 * - Recommendations
 * - Failure Journey
 * - Business Impact
 *
 * Current Report Sections:
 *
 * - summary
 * - statistics
 * - test results
 * - failureJourney
 * - testData
 * - businessImpact
 *
 * Event Processing:
 *
 * The parser consumes execution-flow events:
 *
 * - FLOW
 * - ACTION
 * - SUCCESS
 * - DATA
 * - ERROR
 *
 * Example:
 *
 * FLOW
 * ↓
 * Filling Lead form
 *
 * DATA
 * ↓
 * Company = IT QA
 *
 * ERROR
 * ↓
 * Locator Failure
 *
 * Result:
 *
 * failureJourney
 * testData
 * rootCause
 * recommendation
 *
 * Key Principle:
 *
 * playwright-results.json provides:
 *
 * - test names
 * - execution status
 * - duration
 *
 * execution-flow.json provides:
 *
 * - diagnostics
 * - business context
 * - execution intelligence
 *
 * Future Evolution:
 *
 * Additional capabilities may include:
 *
 * - Timeline generation
 * - Top Failures
 * - Recommended Actions
 * - Quality Insights
 * - Historical Analysis
 * - AI Analysis
 * - Agent-based Investigation
 *
 * Notes:
 *
 * This class is currently the central component
 * responsible for transforming execution data into
 * actionable quality intelligence.
 */
export class ExecutionContextParser {

    public parse(): ExecutionReport {

        const playwrightParser =
            new PlaywrightResultsParser();

        const playwrightTests =
            playwrightParser.parse();

        const executions =
            this.loadExecutionFlows();

        const tests =
            playwrightTests.map(
                playwrightTest => {

 
                    const normalizedTestName =
                        playwrightTest.name
                            .toLowerCase()
                            .replaceAll(
                                ' ',
                                '-'
                            );

                    const failedExecution =
                        executions.find(
                            execution =>
                                execution.testDirectory
                                    .toLowerCase()
                                    .includes(
                                        normalizedTestName
                                    )
                        );

                    const executionFlow =
                        failedExecution?.executionFlow;

                    const errorEvent =
                        executionFlow
                            ?.filter(
                                event =>
                                    event.type === 'ERROR'
                            )
                            .at(-1);

                    const executionContext =
                        errorEvent?.executionContext;

                    const locator =
                        errorEvent?.technicalContext?.locator as string | undefined;

                    const timeout =
                        errorEvent?.technicalContext?.timeout as string | undefined;

                    let rootCause:
                        string | undefined;

                    let severity:
                        string | undefined;

                    let recommendation:
                        string | undefined;

                    if (
                        playwrightTest.status === 'FAILED'
                        &&
                        locator
                        &&
                        errorEvent?.summary?.includes(
                            'become visible'
                        )
                    ) {

                        rootCause =
                            'LOCATOR_FAILURE';

                        severity =
                            'HIGH';

                        recommendation =
                            'Verify locator strategy and accessible name.';
                    }

                    return {

                        name:
                            playwrightTest.name,

                        status:
                            playwrightTest.status,

                        duration:
                            playwrightTest.duration,

                        error:
                            playwrightTest.status === 'FAILED'
                                ? errorEvent?.summary
                                : undefined,

                        rootCause:
                            playwrightTest.status === 'FAILED'
                                ? rootCause
                                : undefined,

                        severity:
                            playwrightTest.status === 'FAILED'
                                ? severity
                                : undefined,

                        recommendation:
                            playwrightTest.status === 'FAILED'
                                ? recommendation
                                : undefined,

                        executionContext:
                            playwrightTest.status === 'FAILED'
                                ? executionContext
                                : undefined,

                        locator:
                            playwrightTest.status === 'FAILED'
                                ? locator
                                : undefined,

                        timeout:
                            playwrightTest.status === 'FAILED'
                                ? timeout
                                : undefined,

                        stackTraceSummary:
                            playwrightTest.status === 'FAILED'
                                ? errorEvent?.stackTraceSummary
                                : undefined,

                        failureJourney:
                            playwrightTest.status === 'FAILED'
                                ? this.buildFailureJourney(
                                    executionFlow ?? []
                                )
                                : undefined,

                        testData:
                            playwrightTest.status === 'FAILED'
                                ? this.buildTestData(
                                    executionFlow ?? []
                                )
                                : undefined,

                        businessImpact:
                            playwrightTest.status === 'FAILED'
                                ? this.buildBusinessImpact(
                                    this.buildFailureJourney(
                                        executionFlow ?? []
                                    )
                                )
                                : undefined,


                    };
                }
            );

        const passed =
            tests.filter(
                test =>
                    test.status === 'PASSED'
            ).length;

        const failed =
            tests.filter(
                test =>
                    test.status === 'FAILED'
            ).length;

        const skipped =
            tests.filter(
                test =>
                    test.status === 'SKIPPED'
            ).length;

        const duration =
            tests.reduce(
                (total, test) =>
                    total + test.duration,
                0
            );

        const totalTests =
            tests.length;

        const executedTests =
            passed + failed;

        const successRate =
            executedTests === 0
                ? 0
                : Number(
                    (
                        (passed / executedTests) * 100
                    ).toFixed(2)
                );

        const executionStatus =
            failed > 0
                ? 'UNSTABLE'
                : 'STABLE';

        const statistics = {

            flows:
                executions.reduce(
                    (total, execution) =>
                        total +
                        execution.executionFlow.filter(
                            event =>
                                event.type === 'FLOW'
                        ).length,
                    0
                ),

            actions:
                executions.reduce(
                    (total, execution) =>
                        total +
                        execution.executionFlow.filter(
                            event =>
                                event.type === 'ACTION'
                        ).length,
                    0
                ),

            successes:
                executions.reduce(
                    (total, execution) =>
                        total +
                        execution.executionFlow.filter(
                            event =>
                                event.type === 'SUCCESS'
                        ).length,
                    0
                ),

            dataEvents:
                executions.reduce(
                    (total, execution) =>
                        total +
                        execution.executionFlow.filter(
                            event =>
                                event.type === 'DATA'
                        ).length,
                    0
                ),

            errors:
                executions.reduce(
                    (total, execution) =>
                        total +
                        execution.executionFlow.filter(
                            event =>
                                event.type === 'ERROR'
                        ).length,
                    0
                )
        };

        return {

            executionId:
                this.generateExecutionId(),

            project:
                'salesforce-playwright-tests',

            executionDate:
                new Date().toISOString(),

            passed,

            failed,

            skipped,

            duration,

            summary: {

                totalTests,

                executedTests,

                successRate,

                executionStatus
            },

            statistics,

            tests
        };
    }

    private loadExecutionFlows(): {
        testDirectory: string;
        executionFlow: ExecutionFlow[];
    }[] {

        const testResultsPath =
            path.join(
                process.cwd(),
                'test-results'
            );

        const directories =
            fs.readdirSync(
                testResultsPath,
                {
                    withFileTypes: true
                }
            );

        return directories
            .filter(
                directory =>
                    directory.isDirectory()
                    &&
                    !directory.name.startsWith(
                        'auth.setup'
                    )
            )
            .map(
                directory => {

                    const executionFlowFile =
                        path.join(
                            testResultsPath,
                            directory.name,
                            'execution-flow.json'
                        );

                    const fileContent =
                        fs.readFileSync(
                            executionFlowFile,
                            'utf8'
                        );

                    return {

                        testDirectory:
                            directory.name,

                        executionFlow:
                            JSON.parse(
                                fileContent
                            )
                    };
                }
            );
    }

    private buildFailureJourney(
        executionFlow: ExecutionFlow[]
    ): FailureJourney | undefined {

        const errorEvent =
            executionFlow.find(
                event =>
                    event.type === 'ERROR'
                    &&
                    event.executionContext
            );

        if (!errorEvent) {

            return undefined;
        }

        const flowEvents =
            executionFlow.filter(
                event =>
                    event.type === 'FLOW'
            );

        const dataEvents =
            executionFlow.filter(
                event =>
                    event.type === 'DATA'
            );

        const businessFlow =
            flowEvents.length > 0
                ? flowEvents[
                    flowEvents.length - 1
                ].message
                : 'Unknown Flow';


        const lastDataEvent =
            dataEvents[
            dataEvents.length - 1
            ];

        const lastSuccessfulStep =
            dataEvents.length > 0
                ? String(
                    lastDataEvent.metadata?.[
                    'fieldName'
                    ] ?? 'Unknown Step'
                )
                : 'Unknown Step';


        let failedStep =
            'Unknown Step';

        const locator =
            errorEvent.technicalContext?.locator;

        if (locator) {

            const match =
                locator.match(
                    /name:\s*'([^']+)'/
                );

            if (
                match
                &&
                match[1]
            ) {

                failedStep =
                    match[1];
            }
        }

        return {

            businessFlow,

            lastSuccessfulStep,

            failedStep
        };
    }


    private buildTestData(
        executionFlow: ExecutionFlow[]
    ): TestData[] {

        return executionFlow

            .filter(
                event =>
                    event.type === 'DATA'
            )

            .map(
                event => ({

                    field:
                        String(
                            event.metadata?.[
                            'fieldName'
                            ] ?? ''
                        ),

                    value:
                        String(
                            event.metadata?.[
                            'fieldValue'
                            ] ?? ''
                        )
                })
            )

            .filter(
                data =>
                    data.field.length > 0
            );
    }


    private buildBusinessImpact(
        failureJourney?: FailureJourney
    ): BusinessImpact | undefined {

        if (!failureJourney) {

            return undefined;
        }

        return {

            flow:
                failureJourney.businessFlow,

            failedStep:
                failureJourney.failedStep,

            recordsAffected:
                1
        };
    }


    private generateExecutionId():
        string {

        const now =
            new Date();

        return now
            .toISOString()
            .replace(
                /[-:T]/g,
                ''
            )
            .substring(
                0,
                14
            );
    }
}

