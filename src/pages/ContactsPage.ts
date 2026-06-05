import {
  Page,
} from "@playwright/test";

import { BasePage } from "./BasePage";

import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { ExecutionFlowType } from "@/core/execution/ExecutionFlowType";

import { Logger } from "@framework-utils/logger/Logger";

export class ContactsPage extends BasePage {

  private readonly contactListSearch =
    this.page.getByRole(
      "searchbox",
      {
        name: "Search this list...",
      },
    );

  constructor(page: Page) {

    super(page);
  }

  async openContacts(): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Opening Contacts page",
    );

    Logger.debug(
      "Opening Contacts page",
    );

    await this.page.goto(
      "/lightning/o/Contact/list",
    );

    Logger.debug(
      "Contacts page opened successfully",
    );
  }

  async searchContact(
    contactName: string,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      `Searching Contact: ${contactName}`,
    );

    executionContext.addData(
      "Contact Name",
      contactName,
      "Contact Search",
    );

    Logger.debug(
      `Searching Contact: ${contactName}`,
    );

    await this.uiActionsComponent.fill(
      this.contactListSearch,
      contactName,
      "Contact list search",
    );

    await this.uiActionsComponent.press(
      this.contactListSearch,
      "Enter",
      "Contact list search",
    );

    Logger.debug(
      `Contact search executed successfully: ${contactName}`,
    );
  }
}