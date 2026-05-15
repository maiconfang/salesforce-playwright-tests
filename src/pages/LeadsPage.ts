import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { GlobalSearchComponent } from "@components/GlobalSearchComponent";
import { LeadFormComponent } from "@components/LeadFormComponent";
import { LeadData } from "src/models/LeadData";


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
  
  readonly searchGlobalComponent: GlobalSearchComponent;
  readonly leadFormComponent: LeadFormComponent;

  constructor(page: Page) {
    super(page);

    this.searchGlobalComponent =
      new GlobalSearchComponent(page);

    this.leadFormComponent =
      new LeadFormComponent(page);
  }

  async openLeads(): Promise<void> {
    await this.page
      .getByRole("link", { name: "Leads" })
      .click();

    const newButton = this.page.getByRole("button", {
      name: "New",
    });

    await this.waitUntilClickable(newButton);
  }

  /**
   * Waits until locator becomes truly clickable.
   *
   * Useful for Salesforce and SPA applications.
   */
  public async waitUntilClickable(
    locator: Locator,
  ): Promise<void> {
    await expect(async () => {
      await locator.click({ trial: true });
    }).toPass();
  }

  async openNewLeadForm(): Promise<void> {
    await this.page
      .getByRole("button", {
        name: "New",
      })
      .click();

    await expect(
      this.page.getByRole("heading", {
        name: "New Lead",
      }),
    ).toBeVisible();
  }

  async fillLeadForm(lead: LeadData): Promise<void> {
    await this.leadFormComponent.fillLeadForm(lead);
  }

  async saveLead(): Promise<void> {
    await this.page
      .getByRole("button", {
        name: "Save",
        exact: true,
      })
      .click();
  }

  async createLead(lead: LeadData): Promise<void> {
    await this.openNewLeadForm();

    await this.fillLeadForm(lead);

    await this.saveLead();
  }

  async expectLeadCreated(
    lead: LeadData,
  ): Promise<void> {
    const fullName =
      `${lead.salutation} ${lead.firstName} ${lead.lastName}`;

    const toast = this.page.locator(".toastMessage");

    await expect(toast).toBeVisible();

    await expect(toast).toHaveText(
      new RegExp(`Lead .*${fullName}.* was created`),
    );

    await expect(
      this.page.getByRole("heading", {
        name: fullName,
      }),
    ).toBeVisible();
  }

  async expectValidationErrors(
    fields: string[],
  ): Promise<void> {
    const errorDialogHeading =
      this.page.getByRole("heading", {
        name: "We hit a snag.",
      });

    await expect(errorDialogHeading).toBeVisible();

    await expect(
      this.page.getByText(
        "Review the following fields",
      ),
    ).toBeVisible();

    for (const field of fields) {
      await expect(
        this.page.getByRole("link", {
          name: field,
        }),
      ).toBeVisible();
    }
  }

  public async waitToastToDisappear(): Promise<void> {
    const toast = this.page.locator(".toastMessage");

    await toast.waitFor({ state: "hidden" });
  }

  async expectEmptyState(): Promise<void> {
    const emptyStateMessage =
      this.page.getByText(
        "No items to display.",
        {
          exact: true,
        },
      );

    await expect(emptyStateMessage).toBeVisible();
  }

  async expectGlobalSearchNoResults(
    searchText: string,
  ): Promise<void> {
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
  }
}
