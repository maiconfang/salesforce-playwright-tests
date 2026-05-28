import { test, expect } from "@playwright/test";

import { request } from "@playwright/test";

import { LeadsClient } from "@clients/leads/LeadsClient";

import { SalesforceAuthClient } from "@auth/SalesforceAuthClient";

import { TestExecutionContext } from "@execution/TestExecutionContext";

import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";

/**
 * API Only Lead Tests
 *
 * Purpose:
 * - Validates Salesforce Lead creation using API only
 * - Exercises backend/service integration flows
 * - Verifies API response contracts
 *
 * Execution Observability:
 * - Creates isolated execution telemetry
 * - Enables execution-flow.json generation
 * - Supports observability and AI analysis
 * - Maintains execution lifecycle consistency
 *
 * Execution Lifecycle:
 * 1. Create execution context
 * 2. Register context lifecycle
 * 3. Execute API workflow
 * 4. Persist execution telemetry
 * 5. Clear active context
 */

test(
    "should create lead using API only workflow",

    async ({}, testInfo) => {

        const executionContext =
            new TestExecutionContext(
                testInfo.outputDir,
            );

        ExecutionContextManager.setContext(
            executionContext,
        );

        try {

            const apiContext =
                await request.newContext();

            const authClient =
                new SalesforceAuthClient();

            const leadsClient =
                new LeadsClient(
                    apiContext,
                    authClient,
                );

            const response =
                await leadsClient.createLead({

                    FirstName: "API ONLY",

                    LastName: "Fang",

                    Company: "OpenAI",
                });

            console.log(
                "API ONLY RESPONSE:",
                response,
            );

            expect(response.id)
                .toBeTruthy();

            expect(response.success)
                .toBeTruthy();

        } catch (error) {

            executionContext.addError(error);

            throw error;

        } finally {

            executionContext.saveFlow();

            ExecutionContextManager.clear();
        }
    },
);