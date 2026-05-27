import { expect, Locator, Page } from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

/**
 * Reusable global search component for Salesforce.
 *
 * Handles Salesforce global search behavior:
 * - Select search category/module
 * - Fill search input
 * - Trigger search
 * - Validate results
 *
 * Designed for reuse across:
 * - Leads
 * - Contacts
 * - Accounts
 * - Opportunities
 * - Cases
 */
export class GlobalSearchComponent extends BaseComponent {

  private readonly searchInput: Locator;

  private readonly openSearchButton: Locator;

  constructor(page: Page) {
    super(page);

    this.openSearchButton =
      this.page.getByRole("button", {
        name: /Search/i,
      });

    this.searchInput =
      this.page.getByPlaceholder("Search...");
  }

  /**
   * Searches for a record using Salesforce list search.
   */
  async search(
    searchText: string,
  ): Promise<void> {

    await this.openSearch();

    await this.waitUntilSearchReady();

    await this.clearSearch();

    await this.uiActionsComponent.fill(
      this.searchInput,
      searchText,
      "Global search input",
    );

    await this.uiActionsComponent.press(
      this.searchInput,
      "Enter",
      "Global search input",
    );
  }

  /**
   * Validates that at least one search result is visible.
   */
  async expectSearchResultVisible(
    resultText: string,
  ): Promise<void> {

    const resultLink =
      this.page
        .getByRole("link", {
          name: resultText,
        })
        .first();

    await expect(resultLink)
      .toBeVisible({
        timeout: 15000,
      });
  }

  /**
   * Combines search + validation.
   */
  async searchAndExpectResult(
    searchText: string,
  ): Promise<void> {

    await this.search(searchText);

    await this.expectSearchResultVisible(
      searchText,
    );
  }

  /**
   * Opens Salesforce search input.
   */
  private async openSearch(): Promise<void> {

    await this.uiActionsComponent.click(
      this.openSearchButton,
      "Open search button",
    );
  }

  /**
   * Waits until search input becomes editable.
   */
  private async waitUntilSearchReady(): Promise<void> {

    await expect(this.searchInput)
      .toBeEditable();
  }

  /**
   * Clears current search value.
   */
  private async clearSearch(): Promise<void> {

    await this.uiActionsComponent.clear(
      this.searchInput,
      "Global search input",
    );
  }
}