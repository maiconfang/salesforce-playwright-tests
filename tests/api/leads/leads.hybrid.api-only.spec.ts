import { test, expect } from "@playwright/test";

import { request } from "@playwright/test";

import { LeadsClient }
    from "@clients/leads/LeadsClient";

import { SalesforceAuthClient }
    from "@auth/SalesforceAuthClient";

test(
    "should create lead using API only workflow",
    async () => {

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
    },
);