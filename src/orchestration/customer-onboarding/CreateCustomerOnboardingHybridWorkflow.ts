import {
  APIRequestContext,
  request,
} from "@playwright/test";

import { AccountsClient } from "@clients/accounts/AccountsClient";
import { ContactsClient } from "@clients/contacts/ContactsClient";
import { OpportunitiesClient } from "@clients/opportunities/OpportunitiesClient";
import { TasksClient } from "@clients/tasks/TasksClient";

import { SalesforceAuthClient } from "@auth/SalesforceAuthClient";


import { CustomerOnboardingResult } from "@models/customer-onboarding/CustomerOnboardingResult";
import { createCustomerOnboardingData } from "@test-data/customer-onboarding";

export class CreateCustomerOnboardingHybridWorkflow {

  private apiContext!:
    APIRequestContext;

  private authClient!:
    SalesforceAuthClient;

  private accountsClient!:
    AccountsClient;

  private contactsClient!:
    ContactsClient;

  private opportunitiesClient!:
    OpportunitiesClient;

  private tasksClient!:
    TasksClient;

  async execute():
    Promise<CustomerOnboardingResult> {

    await this.initialize();

    const onboardingData =
      createCustomerOnboardingData();

    /*
     * ACCOUNT
     */
    const accountResponse =
      await this.accountsClient.createAccount({

        Name:
          onboardingData.account.name,

      });

    console.log(
      "Account Created:",
      accountResponse.id,
    );

    /*
     * CONTACT
     */
    const contactResponse =
      await this.contactsClient.createContact({

        FirstName:
          onboardingData.contact.firstName,

        LastName:
          onboardingData.contact.lastName,

        Email:
          onboardingData.contact.email,

      });

    console.log(
      "Contact Created:",
      contactResponse.id,
    );

    /*
     * OPPORTUNITY
     */
    const opportunityResponse =
      await this.opportunitiesClient.createOpportunity({

        Name:
          onboardingData.opportunity.name,

        StageName:
          onboardingData.opportunity.stageName,

        CloseDate:
          onboardingData.opportunity.closeDate,

      });

    console.log(
      "Opportunity Created:",
      opportunityResponse.id,
    );

    /*
     * TASK
     */
    const taskResponse =
      await this.tasksClient.createTask({

        Subject:
          onboardingData.task.subject,

      });

    console.log(
      "Task Created:",
      taskResponse.id,
    );

    return {

      account: {

        id:
          accountResponse.id,

        name:
          onboardingData.account.name,

      },

      contact: {

        id:
          contactResponse.id,

        firstName:
          onboardingData.contact.firstName,

        lastName:
          onboardingData.contact.lastName,

        email:
          onboardingData.contact.email,

      },

      opportunity: {

        id:
          opportunityResponse.id,

        name:
          onboardingData.opportunity.name,

        stageName:
          onboardingData.opportunity.stageName,

      },

      task: {

        id:
          taskResponse.id,

        subject:
          onboardingData.task.subject,

      },

      success: true,

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

    this.contactsClient =
      new ContactsClient(
        this.apiContext,
        this.authClient,
      );

    this.opportunitiesClient =
      new OpportunitiesClient(
        this.apiContext,
        this.authClient,
      );

    this.tasksClient =
      new TasksClient(
        this.apiContext,
        this.authClient,
      );
  }
}