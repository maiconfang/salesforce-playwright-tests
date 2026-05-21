import { request } from "@playwright/test";
import { SalesforceTokenResponse } from "../../contracts/SalesforceTokenResponse";

export class SalesforceAuthClient {
  private accessToken?: string;

  async authenticate(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    const response = await request.newContext().post(
      `${process.env.SF_BASE_URL}/services/oauth2/token`,
      {
        form: {
          grant_type: "password",
          client_id: process.env.SF_CLIENT_ID,
          client_secret: process.env.SF_CLIENT_SECRET,
          username: process.env.SF_USERNAME,
          password: `${process.env.SF_PASSWORD}${process.env.SF_SECURITY_TOKEN}`,
        },
      },
    );

    const token = (await response.json()) as SalesforceTokenResponse;

    this.accessToken = token.access_token;

    return this.accessToken;
  }
}
