import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LeadData } from "src/models/LeadData";
import { LeadFormComponent } from "@components/forms/LeadFormComponent";
import { CrudActionsComponent } from "@components/crud/CrudActionsComponent";
import { ToastComponent } from "@components/toast/ToastComponent";
import { ModalComponent } from "@components/modal/ModalComponent";
import { GlobalSearchComponent } from "@components/search/GlobalSearchComponent";

/**
 * LeadsPage
 *
 * Architecture:
 * - LeadsPage orchestrates the Lead flow
 * - Form logic delegated to LeadFormComponent
 * - Search logic delegated to GlobalSearchComponent
 *
 * Composition examples:
 * - LeadsPage HAS-A LeadFormComponent
 * - LeadsPage HAS-A GlobalSearchComponent
 *
 * Benefits:
 * - Cleaner Page Object
 * - Better scalability
 * - Reusable components
 * - Easier maintenance
 * - Enterprise-style design
 */
export class LeadsPage extends BasePage {
  private readonly leadFormComponent: LeadFormComponent;
  private readonly crudActionsComponent: CrudActionsComponent;
  private readonly toastComponent: ToastComponent;
  private readonly modalComponent: ModalComponent;
  private readonly globalSearchComponent: GlobalSearchComponent;

  constructor(page: Page) {
    super(page);

    this.leadFormComponent = new LeadFormComponent(page);

    this.crudActionsComponent = new CrudActionsComponent(page);

    this.toastComponent = new ToastComponent(page);

    this.modalComponent = new ModalComponent(page);

    this.globalSearchComponent = new GlobalSearchComponent(page);
  }

  async openLeads(): Promise<void> {
    // await this.page.waitForLoadState("networkidle");

    const leadsLink = this.page.getByRole("link", {
      name: "Leads",
    });

    await this.uiActionsComponent.click(
      leadsLink, 
      "Leads navigation link"
    );
  }

  async createLead(lead: LeadData): Promise<void> {
    await this.openNewLeadForm();

    await this.fill(lead);

    await this.crudActionsComponent.clickSave();
  }

  async openNewLeadForm(): Promise<void> {

    const newButton = this.page.getByRole(
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
      this.page.getByRole(
        "heading",
        {
          name: "New Lead",
        },
      ),
    ).toBeVisible();
  }

  async fill(lead: LeadData): Promise<void> {
    await this.leadFormComponent.fill(lead);
  }

  async expectLeadCreated(lead: LeadData): Promise<void> {
    const fullName = `${lead.salutation} ${lead.firstName} ${lead.lastName}`;

    await this.toastComponent.expectVisible();

    await this.toastComponent.expectMessage(
      new RegExp(`Lead .*${fullName}.* was created`),
    );

    await expect(
      this.page.getByRole("heading", {
        name: fullName,
      }),
    ).toBeVisible();
  }

  async expectEmptyState(): Promise<void> {
    const emptyStateMessage = this.page.getByText("No items to display.", {
      exact: true,
    });

    await expect(emptyStateMessage).toBeVisible();
  }

  async expectGlobalSearchNoResults(searchText: string): Promise<void> {
    await expect(
      this.page.getByText("Don't give up yet!", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      this.page.getByText(`We searched for "${searchText}".`, {
        exact: true,
      }),
    ).toBeVisible();
  }

  async searchLead(searchText: string): Promise<void> {
    await this.globalSearchComponent.search(searchText);
  }

  async saveLead(): Promise<void> {
    await this.crudActionsComponent.clickSave();
  }

  async expectValidationErrors(fields: string[]): Promise<void> {
    await this.leadFormComponent.expectValidationErrors(fields);
  }

  async cancelLeadCreation(): Promise<void> {
    await this.modalComponent.cancel();
  }
}
