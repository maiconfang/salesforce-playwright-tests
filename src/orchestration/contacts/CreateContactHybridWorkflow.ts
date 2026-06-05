import {
  APIRequestContext,
  Page,
  request,
} from "@playwright/test";

import { ContactsClient }
  from "@clients/contacts/ContactsClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { ContactsPage }
  from "@pages/ContactsPage";

import {
  WorkflowResult,
} from "@models/common/WorkflowResult";

import { createContactData } from "@data/contacts";

export class CreateContactHybridWorkflow {

  private apiContext!:
    APIRequestContext;

  private authClient!:
    SalesforceAuthClient;

  private contactsClient!:
    ContactsClient;

  private contactsPage!:
    ContactsPage;

  constructor(
    private readonly page: Page,
  ) {}

  async execute():
    Promise<WorkflowResult> {

    await this.initialize();

    const contactData =
      createContactData();

    const response =
      await this.contactsClient.createContact({

        FirstName:
          contactData.firstName,

        LastName:
          contactData.lastName,

        Email:
          contactData.email,

      });

    console.log(
      "Hybrid Workflow - Created Contact:",
      JSON.stringify(
        response,
        null,
        2,
      ),
    );

    await this.contactsPage.open();

    await this.contactsPage.openContacts();

    await this.contactsPage.searchContact(
      `${contactData.firstName} ${contactData.lastName}`,
    );

    return {

      id:
        response.id,

      success:
        response.success,

      entityType:
        "Contact",

      entityName:
        `${contactData.firstName} ${contactData.lastName}`,

    };
  }

  private async initialize() {

    this.apiContext =
      await request.newContext({

        baseURL:
          process.env.SF_INSTANCE_URL,

      });

    this.authClient =
      new SalesforceAuthClient();

    this.contactsClient =
      new ContactsClient(
        this.apiContext,
        this.authClient,
      );

    this.contactsPage =
      new ContactsPage(
        this.page,
      );
  }
}