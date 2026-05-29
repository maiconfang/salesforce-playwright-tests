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
import { Account } from "@api/models/Account";

export class AccountsClient
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

  async createAccount(
    payload: Partial<Account>,
  ): Promise<SalesforceCreateResponse> {

    return this.post(
      "/sobjects/Account/",
      payload,
    );
  }

  async getAccountById(
    accountId: string,
  ): Promise<APIResponse> {

    return this.get(
      `/sobjects/Account/${accountId}`,
    );
  }

  async updateAccount(
    accountId: string,
    payload: Partial<Account>,
  ): Promise<APIResponse> {

    return this.patch(
      `/sobjects/Account/${accountId}`,
      payload,
    );
  }

  async deleteAccount(
    accountId: string,
  ): Promise<APIResponse> {

    return this.delete(
      `/sobjects/Account/${accountId}`,
    );
  }
}