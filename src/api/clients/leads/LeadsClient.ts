import {
  APIRequestContext,
  APIResponse,
} from "@playwright/test";

import { SalesforceApiClient }
  from "../base/SalesforceApiClient";

import { SalesforceAuthClient }
  from "@api/auth/SalesforceAuthClient";
import { Lead } from "@api/models/Lead";
import { SalesforceCreateResponse } from "@api/contracts/SalesforceCreateResponse";

export class LeadsClient
  extends SalesforceApiClient {

  constructor(
    request: APIRequestContext,
    authClient: SalesforceAuthClient,
  ) {
    super(request, authClient);
  }

  async createLead(
    payload: Partial<Lead>,
  ): Promise<SalesforceCreateResponse> {

    return this.post(
      "/sobjects/Lead/",
      payload,
    );
  }

  async getLeadById(
    leadId: string,
  ): Promise<APIResponse> {

    return this.get(
      `/sobjects/Lead/${leadId}`,
    );
  }

  async updateLead(
    leadId: string,
    payload: Record<string, unknown>,
  ): Promise<APIResponse> {

    return this.patch(
      `/sobjects/Lead/${leadId}`,
      payload,
    );
  }

  async deleteLead(
    leadId: string,
  ): Promise<APIResponse> {

    return this.delete(
      `/sobjects/Lead/${leadId}`,
    );
  }
}