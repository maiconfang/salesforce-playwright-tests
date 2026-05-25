import { test, expect, request } from "@playwright/test";
import { LeadsClient } from "@clients/leads/LeadsClient";
import { SalesforceAuthClient } from "@auth/SalesforceAuthClient";

test("should create a Salesforce lead",
    async () => {

        const apiContext = await request.newContext();

        const authClient = new SalesforceAuthClient();

        const leadsClient =
            new LeadsClient(
                apiContext,
                authClient,
            );

        const response =
            await leadsClient.createLead({
                FirstName: "Maicon Alexander mf",
                LastName: "Fang",
                Company: "OpenAI",
            });

        console.log(
            "Created Lead:",
            JSON.stringify(
                response,
                null,
                2,
            ),
        );

        expect(response.id)
            .toBeTruthy();

        expect(response.success)
            .toBeTruthy();
    },
);