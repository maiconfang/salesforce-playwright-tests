import { test, expect, request } from "@playwright/test";

import { requiredEnv } from "@/utils/env";

test(
  "should authenticate with Salesforce API",
  async () => {

    const apiContext = await request.newContext();

    await test.step(
      "Authenticate with Salesforce OAuth API",
      async () => {

        console.log(
          "Authenticating with Salesforce OAuth API...",
        );

        const response = await apiContext.post(
          `${requiredEnv("SF_AUTH_URL")}/services/oauth2/token`,
          {
            form: {
              grant_type: "client_credentials",

              client_id: requiredEnv("SF_CLIENT_ID"),

              client_secret: requiredEnv(
                "SF_CLIENT_SECRET",
              ),
            },
          },
        );

        console.log(
          "Response status:",
          response.status(),
        );

        const responseBody =
          await response.json();

        console.log(
          "Salesforce response:",
          JSON.stringify(
            responseBody,
            null,
            2,
          ),
        );

        expect(
          response.ok(),
        ).toBeTruthy();

        expect(
          responseBody.access_token,
        ).toBeTruthy();
      },
    );
  },
);