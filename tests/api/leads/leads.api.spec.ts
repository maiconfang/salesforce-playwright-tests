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

            
        const now = new Date();

        const formattedDate =
            `${now.getFullYear()}`
            + `-${String(now.getMonth() + 1).padStart(2, "0")}`
            + `-${String(now.getDate()).padStart(2, "0")}`
            + ` ${String(now.getHours()).padStart(2, "0")}`
            + `-${String(now.getMinutes()).padStart(2, "0")}`;

        const firstName =
            `Maicon ${formattedDate}`;

        const response =
            await leadsClient.createLead({
                FirstName: firstName,
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