import { expect, Locator, Page } from "@playwright/test";

import { LeadData } from "@models/LeadData";

import { BaseComponent } from "@components/BaseComponent";

import { ComboboxComponent } from "@components/forms/combobox/ComboboxComponent";
import { AddressComponent } from "@components/forms/address/AddressComponent";
import { TextboxComponent } from "@components/forms/textbox/TextboxComponent";
import { NumberInputComponent } from "@components/forms/number-input/NumberInputComponent";

/**
 * LeadFormComponent
 *
 * Responsibility:
 * - Handle Lead form interactions
 * - Coordinate form components
 * - Handle form validations
 *
 * Architecture:
 * - LeadFormComponent orchestrates form behavior
 * - Combobox logic delegated to ComboboxComponent
 * - Address logic delegated to AddressComponent
 * - Textbox logic delegated to TextboxComponent
 * - Number input logic delegated to NumberInputComponent
 *
 * Benefits:
 * - Cleaner form component
 * - Reusable UI components
 * - Better maintainability
 * - More scalable architecture
 */
export class LeadFormComponent extends BaseComponent {

  private readonly comboboxComponent: ComboboxComponent;

  private readonly addressComponent: AddressComponent;

  private readonly textboxComponent: TextboxComponent;

  private readonly numberInputComponent: NumberInputComponent;

  // Personal Information

  private readonly firstNameInput: Locator;

  private readonly lastNameInput: Locator;

  private readonly titleInput: Locator;

  // Contact Information

  private readonly companyInput: Locator;

  private readonly emailInput: Locator;

  private readonly phoneInput: Locator;

  // Address Information

  private readonly streetInput: Locator;

  private readonly postalCodeInput: Locator;

  // Business Information

  private readonly descriptionInput: Locator;

  constructor(page: Page) {
    super(page);

    this.comboboxComponent =
      new ComboboxComponent(page);

    this.addressComponent =
      new AddressComponent(page);

    this.textboxComponent =
      new TextboxComponent(page);

    this.numberInputComponent =
      new NumberInputComponent(page);

    // Personal Information

    this.firstNameInput =
      this.page.getByRole("textbox", {
        name: "First Name",
      });

    this.lastNameInput =
      this.page.getByRole("textbox", {
        name: "Last Name",
      });

    this.titleInput =
      this.page.getByRole("textbox", {
        name: "Title",
      });

    // Contact Information

    this.companyInput =
      this.page.getByRole("textbox", {
        name: "Company",
      });

    this.emailInput =
      this.page.getByRole("textbox", {
        name: "Email",
      });

    this.phoneInput =
      this.page.getByRole("textbox", {
        name: "Phone",
      });

    // Address Information

    this.streetInput =
      this.page.getByRole("textbox", {
        name: "Street",
      });

    this.postalCodeInput =
      this.page.getByRole("textbox", {
        name: "Zip/Postal Code",
      });

    // Business Information

    this.descriptionInput =
      this.page.getByRole("textbox", {
        name: "Description",
      });
  }

  async fill(
    lead: LeadData,
  ): Promise<void> {

    await this.fillPersonalInformation(
      lead,
    );

    await this.fillContactInformation(
      lead,
    );

    await this.fillAddressInformation(
      lead,
    );

    await this.fillBusinessInformation(
      lead,
    );
  }

  private async fillPersonalInformation(
    lead: LeadData,
  ): Promise<void> {

    await this.comboboxComponent.selectOption(
      "Salutation",
      lead.salutation,
    );

    await this.textboxComponent.fill(
      this.firstNameInput,
      lead.firstName,
    );

    await this.textboxComponent.fill(
      this.lastNameInput,
      lead.lastName,
    );

    await this.textboxComponent.fill(
      this.titleInput,
      lead.title,
    );
  }

  private async fillContactInformation(
    lead: LeadData,
  ): Promise<void> {

    await this.textboxComponent.fill(
      this.companyInput,
      lead.company,
    );

    await this.textboxComponent.fill(
      this.emailInput,
      lead.email,
    );

    await this.textboxComponent.fill(
      this.phoneInput,
      lead.phone,
    );
  }

  private async fillAddressInformation(
    lead: LeadData,
  ): Promise<void> {

    await this.addressComponent.selectAddress(
      lead.addressSearch,
      lead.addressOption,
    );

    await this.addressComponent.expectAddressFields(
      lead.city,
      lead.stateProvince,
      lead.country,
    );

    await this.textboxComponent.fill(
      this.streetInput,
      lead.street,
    );

    await this.textboxComponent.fill(
      this.postalCodeInput,
      lead.postalCode,
    );
  }

  private async fillBusinessInformation(
    lead: LeadData,
  ): Promise<void> {

    await this.comboboxComponent.selectOption(
      "Rating",
      lead.rating,
    );

    await this.numberInputComponent.fill(
      "No. of Employees",
      lead.numberOfEmployees,
    );

    await this.comboboxComponent.selectOption(
      "Lead Source",
      lead.leadSource,
    );

    await this.numberInputComponent.fill(
      "Annual Revenue",
      lead.annualRevenue,
    );

    await this.comboboxComponent.selectOption(
      "Industry",
      lead.industry,
    );

    await this.textboxComponent.fill(
      this.descriptionInput,
      lead.description,
    );
  }

  async expectValidationErrors(
    fields: string[],
  ): Promise<void> {

    const errorDialogHeading =
      this.page.getByRole("heading", {
        name: "We hit a snag.",
      });

    await expect(errorDialogHeading)
      .toBeVisible();

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
}