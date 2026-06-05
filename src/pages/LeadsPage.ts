import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

import { BasePage } from "./BasePage";

import { LeadData } from "@models/LeadData";

import { LeadFormComponent } from "@components/forms/LeadFormComponent";
import { CrudActionsComponent } from "@components/crud/CrudActionsComponent";
import { ToastComponent } from "@components/toast/ToastComponent";
import { ModalComponent } from "@components/modal/ModalComponent";

import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { ExecutionFlowType } from "@/core/execution/ExecutionFlowType";

import { Logger } from "@framework-utils/logger/Logger";

export class LeadsPage extends BasePage {

  private readonly leadFormComponent:
    LeadFormComponent;

  private readonly crudActionsComponent:
    CrudActionsComponent;

  private readonly toastComponent:
    ToastComponent;

  private readonly modalComponent:
    ModalComponent;

  private readonly newLeadHeading:
    Locator;

  private readonly leadListSearch:
    Locator;

  constructor(page: Page) {

    super(page);

    this.leadFormComponent =
      new LeadFormComponent(page);

    this.crudActionsComponent =
      new CrudActionsComponent(page);

    this.toastComponent =
      new ToastComponent(page);

    this.modalComponent =
      new ModalComponent(page);

    this.newLeadHeading =
      this.page.getByRole(
        "heading",
        {
          name: "New Lead",
        },
      );

    this.leadListSearch =
      this.page.getByRole(
        "searchbox",
        {
          name: "Search this list...",
        },
      );
  }

  /**
   * Opens the Leads module.
   */
  async openLeads(): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Opening Leads page",
    );

    Logger.debug(
      "Opening Leads page",
    );

    const leadsLink =
      this.page.getByRole("link", {
        name: "Leads",
      });

    await expect(leadsLink)
      .toBeVisible();

    await this.uiActionsComponent.click(
      leadsLink,
      "Leads navigation link",
    );

    Logger.debug(
      "Leads page opened successfully",
    );
  }

  /**
   * Searches for a Lead.
   */
  async searchLead(
    searchText: string,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      `Searching Lead: ${searchText}`,
    );

    executionContext.addData(
      "Lead Name",
      searchText,
      "Lead Search",
    );

    Logger.debug(
      `Searching Lead: ${searchText}`,
    );

    await this.uiActionsComponent.fill(
      this.leadListSearch,
      searchText,
      "Lead list search",
    );

    await this.uiActionsComponent.press(
      this.leadListSearch,
      "Enter",
      "Lead list search",
    );

    Logger.debug(
      `Lead search executed successfully: ${searchText}`,
    );
  }

  /**
   * Creates a new Lead.
   */
  async createLead(
    lead: LeadData,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Creating new Lead",
    );

    Logger.debug(
      "Starting Lead creation flow",
    );

    await this.openNewLeadForm();

    await this.fill(lead);

    await this.crudActionsComponent.clickSave();

    Logger.debug(
      "Lead save action executed",
    );
  }

  /**
   * Opens the New Lead modal/form.
   */
  async openNewLeadForm(): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Opening New Lead form",
    );

    const newButton =
      this.page.getByRole(
        "button",
        {
          name: "New",
        },
      );

    await this.uiActionsComponent.click(
      newButton,
      "New lead button",
    );

    await expect(
      this.newLeadHeading,
    ).toBeVisible();

    Logger.debug(
      "New Lead form opened successfully",
    );
  }

  /**
   * Fills the Lead form.
   */
  async fill(
    lead: LeadData,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Filling Lead form",
    );

    Logger.debug(
      "Filling Lead form",
    );

    await this.leadFormComponent.fill(
      lead,
    );

    Logger.debug(
      "Lead form filled successfully",
    );
  }

  /**
   * Validates that the Lead was created successfully.
   */
  async expectLeadCreated(
    lead: LeadData,
  ): Promise<void> {

    const fullName =
      [
        lead.salutation,
        lead.firstName,
        lead.lastName,
      ]
        .filter(Boolean)
        .join(" ");

    Logger.debug(
      `Validating created Lead: ${fullName}`,
    );

    await this.toastComponent.expectVisible();

    await this.toastComponent.expectMessage(
      new RegExp(
        `Lead .*${fullName}.* was created`,
      ),
    );

    await expect(
      this.page.getByRole("heading", {
        name: fullName,
      }),
    ).toBeVisible();

    Logger.debug(
      `Lead created successfully: ${fullName}`,
    );
  }

  /**
   * Validates empty state visibility.
   */
  async expectEmptyState(): Promise<void> {

    Logger.debug(
      "Validating Leads empty state",
    );

    const emptyStateMessage =
      this.page.getByText(
        "No items to display.",
        {
          exact: true,
        },
      );

    await expect(
      emptyStateMessage,
    ).toBeVisible();

    Logger.debug(
      "Leads empty state validated successfully",
    );
  }

  /**
   * Validates no results state.
   */
  async expectGlobalSearchNoResults(
    searchText: string,
  ): Promise<void> {

    Logger.debug(
      `Validating no results for search: ${searchText}`,
    );

    await expect(
      this.page.getByText(
        "Don't give up yet!",
        {
          exact: true,
        },
      ),
    ).toBeVisible();

    await expect(
      this.page.getByText(
        `We searched for "${searchText}".`,
        {
          exact: true,
        },
      ),
    ).toBeVisible();

    Logger.debug(
      "No results validated successfully",
    );
  }

  /**
   * Clicks Save on Lead form.
   */
  async saveLead(): Promise<void> {

    Logger.debug(
      "Saving Lead",
    );

    await this.crudActionsComponent.clickSave();

    Logger.debug(
      "Lead save executed successfully",
    );
  }

  /**
   * Validates Lead form validation errors.
   */
  async expectValidationErrors(
    fields: string[],
  ): Promise<void> {

    Logger.debug(
      "Validating Lead form validation errors",
    );

    await this.leadFormComponent
      .expectValidationErrors(fields);

    Logger.debug(
      "Lead validation errors validated successfully",
    );
  }

  /**
   * Cancels Lead creation.
   */
  async cancelLeadCreation(): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Cancelling Lead creation",
    );

    Logger.debug(
      "Cancelling Lead creation",
    );

    await this.modalComponent.cancel();

    Logger.debug(
      "Lead creation cancelled successfully",
    );
  }
}