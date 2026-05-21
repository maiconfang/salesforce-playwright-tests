import { test as base, request } from "@playwright/test";
import { SalesforceAuthClient } from "../clients/auth/SalesforceAuthClient";
import { LeadsApiClient } from "../clients/leads/LeadsApiClient";

export const test = base.extend({
  leadsApiClient: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: process.env.SF_INSTANCE_URL,
    });

    const authClient = new SalesforceAuthClient();

    const leadsApiClient = new LeadsApiClient(
      apiContext,
      authClient,
    );

    await use(leadsApiClient);
  },
});
