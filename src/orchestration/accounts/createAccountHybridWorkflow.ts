import {
  APIRequestContext,
  Page,
  request,
} from "@playwright/test";

import { AccountsClient }
  from "@clients/accounts/AccountsClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { AccountsPage }
  from "@pages/AccountsPage";
import { createAccountData } from "@data/accounts";
import { WorkflowResult } from "@models/common/WorkflowResult";


export class CreateAccountHybridWorkflow {

  private apiContext!:
    APIRequestContext;

  private authClient!:
    SalesforceAuthClient;

  private accountsClient!:
    AccountsClient;

  private accountsPage!:
    AccountsPage;

  constructor(
    private readonly page: Page,
  ) {}

  async execute():
    Promise<WorkflowResult> {

    await this.initialize();

    const accountData =
      createAccountData();

    const response =
      await this.accountsClient.createAccount({

        Name:
          accountData.name,

      });

    console.log(
      "Hybrid Workflow - Created Account:",
      JSON.stringify(
        response,
        null,
        2,
      ),
    );

    await this.accountsPage.open();

    await this.accountsPage.openAccounts();

    await this.accountsPage.searchAccount(
      accountData.name,
    );

    await this.accountsPage.expectAccountVisible(
      accountData.name,
    );

    return {

      id:
        response.id,

      success:
        response.success,

      entityType:
        "Account",

      entityName:
        accountData.name,

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

    this.accountsClient =
      new AccountsClient(
        this.apiContext,
        this.authClient,
      );

    this.accountsPage =
      new AccountsPage(
        this.page,
      );
  }
}