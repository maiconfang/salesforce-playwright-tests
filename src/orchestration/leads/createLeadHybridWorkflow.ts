import { APIRequestContext, Page, request } from "@playwright/test";

import { LeadsClient } from "@clients/leads/LeadsClient";

import { SalesforceAuthClient } from "@auth/SalesforceAuthClient";

import { LeadsPage } from "@pages/LeadsPage";

export class CreateLeadHybridWorkflow {
  private apiContext!: APIRequestContext;

  private authClient!: SalesforceAuthClient;

  private leadsClient!: LeadsClient;

  private leadsPage!: LeadsPage;

  constructor(private readonly page: Page) {}

  async execute() {
    await this.initialize();

    const now = new Date();

    const formattedDate =
      `${now.getFullYear()}` +
      `-${String(now.getMonth() + 1).padStart(2, "0")}` +
      `-${String(now.getDate()).padStart(2, "0")}` +
      ` ${String(now.getHours()).padStart(2, "0")}` +
      `-${String(now.getMinutes()).padStart(2, "0")}`;

    const firstName = `Maicon ${formattedDate}`;

    const lastName = "Fang";

    const company = "OpenAI";

    const response = await this.leadsClient.createLead({
      FirstName: firstName,
      LastName: lastName,
      Company: company,
    });

    console.log(
      "Hybrid Workflow - Created Lead:",
      JSON.stringify(response, null, 2),
    );

    /*
     * UI FLOW
     * We are not validating yet.
     * For now, we are only preparing
     * the hybrid workflow architecture.
     */

    await this.leadsPage.open();

    await this.leadsPage.openLeads();

    return {
      leadId: response.id,
      success: response.success,
      firstName,
      lastName,
      company,
    };
  }

  private async initialize() {
    this.apiContext =
    await request.newContext({
        baseURL:
            process.env.SF_INSTANCE_URL,
    });

    this.authClient = new SalesforceAuthClient();

    this.leadsClient = new LeadsClient(this.apiContext, this.authClient);

    this.leadsPage = new LeadsPage(this.page);
  }
}
