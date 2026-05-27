import { test, expect } from "@playwright/test";
import { TestExecutionContext } from "@execution/TestExecutionContext";
import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { CreateLeadHybridWorkflow } from "@/orchestration/leads/createLeadHybridWorkflow";

test.describe("Leads Hybrid", () => {

    test(
        "should create a Salesforce lead using hybrid workflow",
        async ({ page }, testInfo) => {

            const executionContext = new TestExecutionContext(testInfo.outputDir,);

            ExecutionContextManager.setContext(executionContext,);

            try {

                const workflow = new CreateLeadHybridWorkflow(page);

                const lead = await workflow.execute();

                console.log("Created Lead:", JSON.stringify(lead, null, 2));

                expect(lead.leadId).toBeTruthy();

                expect(lead.success).toBeTruthy();

            } finally {

                executionContext.saveFlow();

                ExecutionContextManager.clear();
            }
        },
    );
});