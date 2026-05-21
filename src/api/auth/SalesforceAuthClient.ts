import type { SalesforceTokenResponse } from "@api/contracts/SalesforceTokenResponse";
import { requiredEnv } from "@/utils/env";
import { APIRequestContext, request, } from "@playwright/test";

export class SalesforceAuthClient {

  private accessToken?: string;

  private apiContext?: APIRequestContext;

  async authenticate(): Promise<string> {

    if (this.accessToken) {

      return this.accessToken;
    }

    if (!this.apiContext) {

      this.apiContext =
        await request.newContext();
    }

    const response =
      await this.apiContext.post(
        `${requiredEnv("SF_AUTH_URL")}/services/oauth2/token`,
        {
          form: {

            grant_type:
              requiredEnv("SF_GRANT_TYPE"),

            client_id:
              requiredEnv("SF_CLIENT_ID"),

            client_secret:
              requiredEnv("SF_CLIENT_SECRET"),
          },
        },
      );

    const token = await response.json() as SalesforceTokenResponse;

    this.accessToken = token.access_token;

    return this.accessToken;
  }
}