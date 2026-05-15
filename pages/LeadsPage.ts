
/*
  Leads
    // Create
    Edit
    Delete
    Search
    Validation
    Required fields
    Empty state
    Cancel
    Duplicate handling
*/

import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export type LeadData = {
  salutation: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  title: string;
  rating: string;
  addressSearch: string;
  addressOption: string;
  city: string;
  stateProvince: string;
  country: string;
  street: string;
  postalCode: string;
  numberOfEmployees: string;
  leadSource: string;
  annualRevenue: string;
  industry: string;
  description: string;
};

export class LeadsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openLeads(): Promise<void> {
    await this.page.getByRole("link", { name: "Leads" }).click();

    const newButton = this.page.getByRole("button", { name: "New" });

    await this.waitUntilClickable(newButton);
  }

  /**
   * Waits until a locator becomes truly clickable and interactable.
   *
   * This method uses Playwright's `click({ trial: true })`
   * combined with `expect().toPass()` to validate whether
   * the element is fully ready for user interaction without
   * performing a real click.
   *
   * This is especially useful for modern SPA applications
   * such as Salesforce, React, Angular, and similar frameworks,
   * where elements may appear visible and enabled before they
   * are actually stable or interactable.
   *
   * Playwright internally validates:
   * - Visibility
   * - Stability
   * - Enabled state
   * - Pointer event availability
   * - Overlay interception
   *
   * Using this helper helps reduce flaky tests and improves
   * synchronization reliability in enterprise UI automation.
   */
  public async waitUntilClickable(locator: Locator): Promise<void> {
    await expect(async () => {
      await locator.click({ trial: true });
    }).toPass();
  }

  async openNewLeadForm(): Promise<void> {
    await this.page.getByRole("button", { name: "New" }).click();
    await expect(
      this.page.getByRole("heading", { name: "New Lead" }),
    ).toBeVisible();
  }

  async fillLeadForm(lead: LeadData): Promise<void> {
    await this.selectComboboxOption("Salutation", lead.salutation);
    await this.page
      .getByRole("textbox", { name: "First Name" })
      .fill(lead.firstName);
    await this.page
      .getByRole("textbox", { name: "Last Name" })
      .fill(lead.lastName);
    await this.page
      .getByRole("textbox", { name: "Company" })
      .fill(lead.company);
    await this.page.getByRole("textbox", { name: "Email" }).fill(lead.email);
    await this.page.getByRole("textbox", { name: "Phone" }).fill(lead.phone);
    await this.page.getByRole("textbox", { name: "Title" }).fill(lead.title);
    await this.selectComboboxOption("Rating", lead.rating);
    await this.selectAddress(lead.addressSearch, lead.addressOption);
    await this.expectAddressFields(lead);
    await this.page.getByRole("textbox", { name: "Street" }).fill(lead.street);
    await this.page
      .getByRole("textbox", { name: "Zip/Postal Code" })
      .fill(lead.postalCode);
    await this.page
      .getByRole("spinbutton", { name: "No. of Employees" })
      .fill(lead.numberOfEmployees);
    await this.selectComboboxOption("Lead Source", lead.leadSource);
    await this.page
      .getByRole("spinbutton", { name: "Annual Revenue" })
      .fill(lead.annualRevenue);
    await this.selectComboboxOption("Industry", lead.industry);
    await this.page
      .getByRole("textbox", { name: "Description" })
      .fill(lead.description);
  }

  async saveLead(): Promise<void> {
    await this.page.getByRole("button", { name: "Save", exact: true }).click();
  }

  async createLead(lead: LeadData): Promise<void> {
    await this.openNewLeadForm();
    await this.fillLeadForm(lead);
    await this.saveLead();
  }


  async expectLeadCreated(lead: LeadData): Promise<void> {
    const fullName = `${lead.salutation} ${lead.firstName} ${lead.lastName}`;

    const toast = this.page.locator('.toastMessage');

    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(
      new RegExp(`Lead .*${fullName}.* was created`)
    );

    await expect(
      this.page.getByRole('heading', { name: fullName }),
    ).toBeVisible();
  }

  private async selectComboboxOption(
    label: string,
    option: string,
  ): Promise<void> {
    await this.page.getByRole("combobox", { name: label }).click();
    await this.page.getByRole("option", { name: option, exact: true }).click();
  }

  private async selectAddress(
    searchText: string,
    optionName: string,
  ): Promise<void> {
    const addressSearch = this.page.getByRole("combobox", {
      name: "Address Search",
    });

    await addressSearch.click();
    await addressSearch.fill(searchText);
    await this.page
      .getByRole("option", { name: optionName, exact: true })
      .click();
    await this.page.getByRole("textbox", { name: "Street" }).click();
  }

  private async expectAddressFields(lead: LeadData): Promise<void> {
    await expect(this.page.getByRole("textbox", { name: "City" })).toHaveValue(
      lead.city,
    );
    await expect(
      this.page.getByRole("textbox", { name: "State/Province" }),
    ).toHaveValue(lead.stateProvince);
    await expect(
      this.page.getByRole("textbox", { name: "Country" }),
    ).toHaveValue(lead.country);
  }

  /**
 * Validates Salesforce field-level validation errors displayed
 * inside the "We hit a snag." error dialog.
 *
 * This method verifies:
 * - Error dialog visibility
 * - Error dialog title
 * - Required field validation messages
 *
 * Example:
 *
 * await leadsPage.expectValidationErrors([
 *   "Name",
 *   "Company",
 * ]);
 */
  async expectValidationErrors(fields: string[]): Promise<void> {
    const errorDialogHeading = this.page.getByRole("heading", {
      name: "We hit a snag.",
    });

    await expect(errorDialogHeading).toBeVisible();

    await expect(
      this.page.getByText("Review the following fields"),
    ).toBeVisible();

    for (const field of fields) {
      await expect(
        this.page.getByRole("link", { name: field }),
      ).toBeVisible();
    }
  }

  public async waitToastToDisappear(): Promise<void> {
    const toast = this.page.locator(".toastMessage");

    await toast.waitFor({ state: "hidden" });
  }

}
