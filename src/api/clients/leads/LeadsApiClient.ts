import { APIRequestContext } from "@playwright/test";
import { SalesforceApiClient } from "../base/SalesforceApiClient";
import { SalesforceAuthClient } from "../auth/SalesforceAuthClient";

export class LeadsApiClient extends SalesforceApiClient {
  constructor(
    request: APIRequestContext,
    authClient: SalesforceAuthClient,
  ) {
    super(request, authClient);
  }

  async createLead(payload: Record<string, unknown>) {
    const response = await this.request.post(
      this.buildEndpoint("/sobjects/Lead"),
      {
        headers: await this.buildHeaders(),
        data: payload,
      },
    );

    await this.validateResponse(response);

    return response.json();
  }
}
