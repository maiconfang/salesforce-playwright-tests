import {
    test,
    expect,
    request,
} from "@playwright/test";

import { LeadsClient }
    from "@clients/leads/LeadsClient";

import { SalesforceAuthClient }
    from "@auth/SalesforceAuthClient";

import { LeadBuilder }
    from "@builders/LeadBuilder";

import { TestExecutionContext }
    from "@execution/TestExecutionContext";

import { ExecutionContextManager }
    from "@/core/execution/ExecutionContextManager";

test.describe(
    "Leads API",

    () => {

        test(
            "should create a lead via Salesforce API",

            async ({ }, testInfo) => {

                const executionContext =
                    new TestExecutionContext(
                        testInfo.outputDir,
                    );

                ExecutionContextManager.setContext(
                    executionContext,
                );

                let apiContext;

                try {

                    apiContext =
                        await request.newContext();

                    const authClient =
                        new SalesforceAuthClient();

                    const leadsClient =
                        new LeadsClient(
                            apiContext,
                            authClient,
                        );

                    const now =
                        new Date();

                    const formattedDate =
                        `${now.getFullYear()}`
                        + `-${String(now.getMonth() + 1).padStart(2, "0")}`
                        + `-${String(now.getDate()).padStart(2, "0")}`
                        + `-${String(now.getHours()).padStart(2, "0")}`
                        + `-${String(now.getMinutes()).padStart(2, "0")}`;

                    const lead =
                        new LeadBuilder()
                            .withFirstName(
                                `Maicon ${formattedDate}`,
                            )
                            .withLastName(
                                "Fang",
                            )
                            .withCompany(
                                "OpenAI",
                            )
                            .build();

                    const response =
                        await leadsClient.createLead(
                            lead,
                        );

                    console.log(
                        "Created Lead:",
                        JSON.stringify(
                            response,
                            null,
                            2,
                        ),
                    );

                    expect(
                        response.id,
                    ).toBeTruthy();

                    expect(
                        response.success,
                    ).toBeTruthy();

                } catch (error) {

                    executionContext.addError(
                        error,
                    );

                    throw error;

                } finally {

                    if (apiContext) {

                        await apiContext.dispose();
                    }

                    executionContext.saveFlow();

                    ExecutionContextManager.clear();
                }
            },
        );

        test(
            "should get a lead by id",

            async ({ }, testInfo) => {

                const executionContext =
                    new TestExecutionContext(
                        testInfo.outputDir,
                    );

                ExecutionContextManager.setContext(
                    executionContext,
                );

                let apiContext;

                try {

                    apiContext =
                        await request.newContext();

                    const authClient =
                        new SalesforceAuthClient();

                    const leadsClient =
                        new LeadsClient(
                            apiContext,
                            authClient,
                        );

                    const lead =
                        new LeadBuilder()
                            .withFirstName(
                                "Maicon",
                            )
                            .withLastName(
                                "Fang",
                            )
                            .withCompany(
                                "OpenAI",
                            )
                            .build();

                    const createResponse =
                        await leadsClient.createLead(
                            lead,
                        );

                    const leadId =
                        createResponse.id;

                    const getResponse =
                        await leadsClient.getLeadById(
                            leadId,
                        );

                    const leadData =
                        await getResponse.json();

                    expect(
                        leadData.Id,
                    ).toBe(
                        leadId,
                    );

                    expect(
                        leadData.LastName,
                    ).toBe(
                        "Fang",
                    );

                } catch (error) {

                    executionContext.addError(
                        error,
                    );

                    throw error;

                } finally {

                    if (apiContext) {

                        await apiContext.dispose();
                    }

                    executionContext.saveFlow();

                    ExecutionContextManager.clear();
                }
            },
        );

        test(
            "should update a lead",

            async ({ }, testInfo) => {

                const executionContext =
                    new TestExecutionContext(
                        testInfo.outputDir,
                    );

                ExecutionContextManager.setContext(
                    executionContext,
                );

                let apiContext;

                try {

                    apiContext =
                        await request.newContext();

                    const authClient =
                        new SalesforceAuthClient();

                    const leadsClient =
                        new LeadsClient(
                            apiContext,
                            authClient,
                        );

                    const lead =
                        new LeadBuilder()
                            .withFirstName(
                                "Maicon",
                            )
                            .withLastName(
                                "Fang",
                            )
                            .withCompany(
                                "OpenAI",
                            )
                            .build();

                    const createResponse =
                        await leadsClient.createLead(
                            lead,
                        );

                    const leadId =
                        createResponse.id;

                    const updatedCompany =
                        "OpenAI Updated";

                    const updateResponse =
                        await leadsClient.updateLead(
                            leadId,
                            {
                                Company: updatedCompany,
                            },
                        );

                    expect(
                        updateResponse.status(),
                    ).toBe(204);

                    const getResponse =
                        await leadsClient.getLeadById(
                            leadId,
                        );

                    const leadData =
                        await getResponse.json();

                    expect(
                        leadData.Company,
                    ).toBe(
                        updatedCompany,
                    );

                } catch (error) {

                    executionContext.addError(
                        error,
                    );

                    throw error;

                } finally {

                    if (apiContext) {

                        await apiContext.dispose();
                    }

                    executionContext.saveFlow();

                    ExecutionContextManager.clear();
                }
            },
        );

        test(
  "should delete a lead",

  async ({}, testInfo) => {

    const executionContext =
      new TestExecutionContext(
        testInfo.outputDir,
      );

    ExecutionContextManager.setContext(
      executionContext,
    );

    let apiContext;

    try {

      apiContext =
        await request.newContext();

      const authClient =
        new SalesforceAuthClient();

      const leadsClient =
        new LeadsClient(
          apiContext,
          authClient,
        );

      const lead =
        new LeadBuilder()
          .withFirstName(
            "Maicon",
          )
          .withLastName(
            "Fang",
          )
          .withCompany(
            "OpenAI",
          )
          .build();

      const createResponse =
        await leadsClient.createLead(
          lead,
        );

      const leadId =
        createResponse.id;

      const deleteResponse =
        await leadsClient.deleteLead(
          leadId,
        );

      expect(
        deleteResponse.status(),
      ).toBe(204);

      const getResponse =
        await leadsClient.getLeadById(
          leadId,
        );

      expect(
        getResponse.status(),
      ).toBe(404);

    } catch (error) {

      executionContext.addError(
        error,
      );

      throw error;

    } finally {

      if (apiContext) {

        await apiContext.dispose();
      }

      executionContext.saveFlow();

      ExecutionContextManager.clear();
    }
  },
);
    },

);