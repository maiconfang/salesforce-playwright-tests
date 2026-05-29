import {
  APIRequestContext,
  APIResponse,
} from "@playwright/test";

import { SalesforceApiClient }
  from "../base/SalesforceApiClient";

import { SalesforceAuthClient }
  from "@api/auth/SalesforceAuthClient";

import { Contact } from "@api/models/Contact";

import { SalesforceCreateResponse }
  from "@contracts/SalesforceCreateResponse";

export class ContactsClient
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

  async createContact(
    payload: Partial<Contact>,
  ): Promise<SalesforceCreateResponse> {

    return this.post(
      "/sobjects/Contact/",
      payload,
    );
  }

  async getContactById(
    contactId: string,
  ): Promise<APIResponse> {

    return this.get(
      `/sobjects/Contact/${contactId}`,
    );
  }

  async updateContact(
    contactId: string,
    payload: Partial<Contact>,
  ): Promise<APIResponse> {

    return this.patch(
      `/sobjects/Contact/${contactId}`,
      payload,
    );
  }

  async deleteContact(
    contactId: string,
  ): Promise<APIResponse> {

    return this.delete(
      `/sobjects/Contact/${contactId}`,
    );
  }
}