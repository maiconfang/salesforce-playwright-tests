import {
  APIRequestContext,
} from "@playwright/test";

import { SalesforceApiClient }
  from "../base/SalesforceApiClient";

import { SalesforceAuthClient }
  from "@api/auth/SalesforceAuthClient";

export class LeadsClient
  extends SalesforceApiClient {

  constructor(
    request: APIRequestContext,
    authClient: SalesforceAuthClient,
  ) {
    super(request, authClient);
  }

  async createLead(
    payload: Record<string, unknown>,
  ): Promise<any> {

    return this.post(
      "/sobjects/Lead/",
      payload,
    );
  }
}