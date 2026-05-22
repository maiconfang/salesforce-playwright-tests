import { test, request }
  from "@playwright/test";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

test.skip("should discover Salesforce API endpoints",
  async () => {

    const apiContext = await request.newContext();

    const authClient = new SalesforceAuthClient();

    const accessToken = await authClient.authenticate();

    console.log(
      "\n========== DISCOVERING SALESFORCE API ==========\n",
    );

    const response =
      await apiContext.get(
        `${process.env.SF_INSTANCE_URL}/services/data/v61.0`,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        },
      );

    console.log(
      "Status:",
      response.status(),
    );

    const responseBody =
      await response.json();

    console.log(
      JSON.stringify(
        responseBody,
        null,
        2,
      ),
    );
  },
);


test.skip("should discover Salesforce sObjects",
  async () => {

    const apiContext =
      await request.newContext();

    const authClient =
      new SalesforceAuthClient();

    const accessToken =
      await authClient.authenticate();

    console.log(
      "\n========== DISCOVERING SOBJECTS ==========\n",
    );

    const response =
      await apiContext.get(
        `${process.env.SF_INSTANCE_URL}/services/data/v61.0/sobjects`,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        },
      );

    console.log(
      "Status:",
      response.status(),
    );

    const responseBody =
      await response.json();

    console.log(
      JSON.stringify(
        responseBody,
        null,
        2,
      ),
    );
  },
);

test.skip("should describe Lead object",
  async () => {

    const apiContext =
      await request.newContext();

    const authClient =
      new SalesforceAuthClient();

    const accessToken =
      await authClient.authenticate();

    console.log(
      "\n========== LEAD DESCRIBE ==========\n",
    );

    const response =
      await apiContext.get(
        `${process.env.SF_INSTANCE_URL}/services/data/v61.0/sobjects/Lead/describe`,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        },
      );

    console.log(
      "Status:",
      response.status(),
    );

    const responseBody =
      await response.json();

    console.log(
      JSON.stringify(
        responseBody,
        null,
        2,
      ),
    );
  },
);