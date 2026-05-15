import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto("/");
  }

  async waitToastToDisappear(): Promise<void> {
    await this.page.locator(".toastMessage").waitFor({ state: "hidden" });
  }

  async waitUntilClickable(locator: Locator): Promise<void> {
    await expect(async () => {
      await locator.click({ trial: true });
    }).toPass();
  }

  async cancelAndCloseModal(): Promise<void> {
    const cancelButton = this.page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });

    await expect(cancelButton).toBeVisible();

    await this.waitUntilClickable(cancelButton);

    await expect(cancelButton).toBeEnabled();

    await cancelButton.click();
  }
}
