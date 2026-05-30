import {
  APIRequestContext,
  APIResponse,
} from "@playwright/test";

import { SalesforceApiClient }
  from "../base/SalesforceApiClient";

import { SalesforceAuthClient }
  from "@api/auth/SalesforceAuthClient";

import { SalesforceCreateResponse }
  from "@contracts/SalesforceCreateResponse";

import { Opportunity }
  from "@api/models/Opportunity";

export class OpportunitiesClient
  extends SalesforceApiClient {

  constructor(
    request: APIRequestContext,
    authClient: SalesforceAuthClient,
  ) {
    super(
      request,
      authClient,
    );
  }

  async createOpportunity(
    payload: Partial<Opportunity>,
  ): Promise<SalesforceCreateResponse> {

    return this.post(
      "/sobjects/Opportunity/",
      payload,
    );
  }

  async getOpportunityById(
    opportunityId: string,
  ): Promise<APIResponse> {

    return this.get(
      `/sobjects/Opportunity/${opportunityId}`,
    );
  }

  async updateOpportunity(
    opportunityId: string,
    payload: Partial<Opportunity>,
  ): Promise<APIResponse> {

    return this.patch(
      `/sobjects/Opportunity/${opportunityId}`,
      payload,
    );
  }

  async deleteOpportunity(
    opportunityId: string,
  ): Promise<APIResponse> {

    return this.delete(
      `/sobjects/Opportunity/${opportunityId}`,
    );
  }
}