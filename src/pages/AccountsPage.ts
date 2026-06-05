import {
  expect,
  Page,
} from "@playwright/test";

import { BasePage } from "./BasePage";

import { GlobalSearchComponent } from "@components/search/GlobalSearchComponent";

import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { ExecutionFlowType } from "@/core/execution/ExecutionFlowType";

import { Logger } from "@framework-utils/logger/Logger";

export class AccountsPage extends BasePage {

  private readonly globalSearchComponent:
    GlobalSearchComponent;

  constructor(page: Page) {

    super(page);

    this.globalSearchComponent =
      new GlobalSearchComponent(page);
  }

  /**
   * Opens the Accounts module.
   */
  async openAccounts(): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Opening Accounts page",
    );

    Logger.debug(
      "Opening Accounts page",
    );

    await this.page.goto(
      "/lightning/o/Account/list",
    );

    Logger.debug(
      "Accounts page opened successfully",
    );
  }

  /**
   * Searches for an Account.
   */
  async searchAccount(
    accountName: string,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      `Searching Account: ${accountName}`,
    );

    executionContext.addData(
      "Account Name",
      accountName,
      "Account Search",
    );

    Logger.debug(
      `Searching Account: ${accountName}`,
    );

    await this.globalSearchComponent.search(
      accountName,
    );

    Logger.debug(
      `Account search executed successfully: ${accountName}`,
    );
  }

  /**
   * Validates Account visibility.
   */
  async expectAccountVisible(
    accountName: string,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      `Validating Account: ${accountName}`,
    );

    Logger.debug(
      `Validating Account: ${accountName}`,
    );

    await expect(
      this.page.getByRole(
        "link",
        {
          name: accountName,
        },
      ),
    ).toBeVisible();

    Logger.debug(
      `Account validated successfully: ${accountName}`,
    );
  }
}