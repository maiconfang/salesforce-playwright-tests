import {
  APIRequestContext,
  Page,
  request,
} from "@playwright/test";

import { OpportunitiesClient }
  from "@clients/opportunities/OpportunitiesClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { OpportunitiesPage }
  from "@pages/OpportunitiesPage";


import {
  WorkflowResult,
} from "@models/common/WorkflowResult";
import { createOpportunityData } from "@data/opportunities";

export class CreateOpportunityHybridWorkflow {

  private apiContext!:
    APIRequestContext;

  private authClient!:
    SalesforceAuthClient;

  private opportunitiesClient!:
    OpportunitiesClient;

  private opportunitiesPage!:
    OpportunitiesPage;

  constructor(
    private readonly page: Page,
  ) {}

  async execute():
    Promise<WorkflowResult> {

    await this.initialize();

    const opportunityData =
      createOpportunityData();

    const response =
      await this.opportunitiesClient.createOpportunity({

        Name:
          opportunityData.name,

        StageName:
          opportunityData.stageName,

        CloseDate:
          opportunityData.closeDate,

        Amount:
          750000,

        Description:
          "Hybrid Opportunity created by Playwright Framework",

      });

    console.log(
      "Hybrid Workflow - Created Opportunity:",
      JSON.stringify(
        response,
        null,
        2,
      ),
    );

    await this.opportunitiesPage.open();

    await this.opportunitiesPage.openOpportunities();

    await this.opportunitiesPage.searchOpportunity(
      opportunityData.name,
    );

    return {

      id:
        response.id,

      success:
        response.success,

      entityType:
        "Opportunity",

      entityName:
        opportunityData.name,

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

    this.opportunitiesClient =
      new OpportunitiesClient(
        this.apiContext,
        this.authClient,
      );

    this.opportunitiesPage =
      new OpportunitiesPage(
        this.page,
      );
  }
}