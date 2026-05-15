import { expect, Page } from "@playwright/test";
import { LeadData } from "@models/LeadData";
import { BaseComponent } from "./BaseComponent";

/**
 * LeadFormComponent
 *
 * Responsibility:
 * - Handle Lead form interactions
 * - Fill Lead data
 * - Address selection
 * - Combobox selection
 * - Address validations
 *
 * Benefits:
 * - Better separation of responsibilities
 * - Cleaner LeadsPage
 * - Easier maintenance
 * - Reusable form logic
 * - More scalable architecture
 */
export class LeadFormComponent extends BaseComponent {

  constructor(page: Page) {
    super(page);
  }

  async fillLeadForm(lead: LeadData): Promise<void> {

    await this.selectComboboxOption(
      "Salutation",
      lead.salutation,
    );

    await this.page
      .getByRole("textbox", {
        name: "First Name",
      })
      .fill(lead.firstName);

    await this.page
      .getByRole("textbox", {
        name: "Last Name",
      })
      .fill(lead.lastName);

    await this.page
      .getByRole("textbox", {
        name: "Company",
      })
      .fill(lead.company);

    await this.page
      .getByRole("textbox", {
        name: "Email",
      })
      .fill(lead.email);

    await this.page
      .getByRole("textbox", {
        name: "Phone",
      })
      .fill(lead.phone);

    await this.page
      .getByRole("textbox", {
        name: "Title",
      })
      .fill(lead.title);

    await this.selectComboboxOption(
      "Rating",
      lead.rating,
    );

    await this.selectAddress(
      lead.addressSearch,
      lead.addressOption,
    );

    await this.expectAddressFields(lead);

    await this.page
      .getByRole("textbox", {
        name: "Street",
      })
      .fill(lead.street);

    await this.page
      .getByRole("textbox", {
        name: "Zip/Postal Code",
      })
      .fill(lead.postalCode);

    await this.page
      .getByRole("spinbutton", {
        name: "No. of Employees",
      })
      .fill(lead.numberOfEmployees);

    await this.selectComboboxOption(
      "Lead Source",
      lead.leadSource,
    );

    await this.page
      .getByRole("spinbutton", {
        name: "Annual Revenue",
      })
      .fill(lead.annualRevenue);

    await this.selectComboboxOption(
      "Industry",
      lead.industry,
    );

    await this.page
      .getByRole("textbox", {
        name: "Description",
      })
      .fill(lead.description);
  }

  private async selectComboboxOption(
    label: string,
    option: string,
  ): Promise<void> {

    const combobox =
      this.page.getByRole("combobox", {
        name: label,
      });

    await this.waitUntilClickable(
      combobox,
    );

    await combobox.click();

    await this.page
      .getByRole("option", {
        name: option,
        exact: true,
      })
      .click();
  }

  private async selectAddress(
    searchText: string,
    optionName: string,
  ): Promise<void> {

    const addressSearch =
      this.page.getByRole("combobox", {
        name: "Address Search",
      });

    await this.waitUntilClickable(
      addressSearch,
    );

    await addressSearch.click();

    await addressSearch.fill(searchText);

    await this.page
      .getByRole("option", {
        name: optionName,
        exact: true,
      })
      .click();

    await this.page
      .getByRole("textbox", {
        name: "Street",
      })
      .click();
  }

  private async expectAddressFields(
    lead: LeadData,
  ): Promise<void> {

    await expect(
      this.page.getByRole("textbox", {
        name: "City",
      }),
    ).toHaveValue(lead.city);

    await expect(
      this.page.getByRole("textbox", {
        name: "State/Province",
      }),
    ).toHaveValue(lead.stateProvince);

    await expect(
      this.page.getByRole("textbox", {
        name: "Country",
      }),
    ).toHaveValue(lead.country);
  }
}
