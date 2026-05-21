import { expect, Locator, Page } from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

/**
 * AddressComponent
 *
 * Responsibility:
 * - Handle Salesforce address interactions
 * - Search and select addresses
 * - Validate autofilled address fields
 *
 * Benefits:
 * - Reusable address behavior
 * - Cleaner form components
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class AddressComponent extends BaseComponent {

  private readonly addressSearch: Locator;

  private readonly streetInput: Locator;

  constructor(page: Page) {
    super(page);

    this.addressSearch =
      this.page.getByRole("combobox", {
        name: "Address Search",
      });

    this.streetInput =
      this.page.getByRole("textbox", {
        name: "Street",
      });
  }

  async selectAddress(
    searchText: string,
    optionName: string,
  ): Promise<void> {

    await this.uiActionsComponent.click(
      this.addressSearch,
    );

    await this.uiActionsComponent.fill(
      this.addressSearch,
      searchText,
    );

    const optionLocator =
      this.page.getByRole("option", {
        name: optionName,
        exact: true,
      });

    await this.uiActionsComponent.click(
      optionLocator,
    );

    /**
     * Forces Salesforce to trigger
     * address autofill updates.
     */
    await this.uiActionsComponent.click(
      this.streetInput,
    );
  }

  async expectAddressFields(
    city: string,
    stateProvince: string,
    country: string,
  ): Promise<void> {

    await expect(
      this.page.getByRole("textbox", {
        name: "City",
      }),
    ).toHaveValue(city);

    await expect(
      this.page.getByRole("textbox", {
        name: "State/Province",
      }),
    ).toHaveValue(stateProvince);

    await expect(
      this.page.getByRole("textbox", {
        name: "Country",
      }),
    ).toHaveValue(country);
  }
}