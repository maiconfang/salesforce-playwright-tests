import {
  Page,
} from "@playwright/test";

import { BasePage } from "./BasePage";

import { GlobalSearchComponent } from "@components/search/GlobalSearchComponent";

import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { ExecutionFlowType } from "@/core/execution/ExecutionFlowType";

import { Logger } from "@framework-utils/logger/Logger";

export class OpportunitiesPage extends BasePage {

  private readonly globalSearchComponent:
    GlobalSearchComponent;

  constructor(page: Page) {

    super(page);

    this.globalSearchComponent =
      new GlobalSearchComponent(page);
  }

  /**
   * Opens the Opportunities module.
   */
  async openOpportunities(): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Opening Opportunities page",
    );

    Logger.debug(
      "Opening Opportunities page",
    );

    await this.page.goto(
      "/lightning/o/Opportunity/list",
    );

    Logger.debug(
      "Opportunities page opened successfully",
    );
  }

  /**
   * Searches for an Opportunity.
   */
  async searchOpportunity(
    opportunityName: string,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      `Searching Opportunity: ${opportunityName}`,
    );

    executionContext.addData(
      "Opportunity Name",
      opportunityName,
      "Opportunity Search",
    );

    Logger.debug(
      `Searching Opportunity: ${opportunityName}`,
    );

    await this.globalSearchComponent.search(
      opportunityName,
    );

    Logger.debug(
      `Opportunity search executed successfully: ${opportunityName}`,
    );
  }
}