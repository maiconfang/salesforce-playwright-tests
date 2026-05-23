import { Page } from "@playwright/test";

import { SynchronizationComponent } from "@components/synchronization/SynchronizationComponent";
import { UiActionsComponent } from "@components/interactions/UiActionsComponent";
import { Logger } from "@framework-utils/logger/Logger";

export class BasePage {
  protected readonly page: Page;

  protected readonly synchronizationComponent: SynchronizationComponent;

  protected readonly uiActionsComponent: UiActionsComponent;

  constructor(page: Page) {
    this.page = page;

    this.synchronizationComponent = new SynchronizationComponent(page);

    this.uiActionsComponent = new UiActionsComponent(page);
  }

  /**
   * Navigates to the application base URL.
   */
  async open(path: string = ""): Promise<void> {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
      throw new Error("BASE_URL is not defined");
    }

    const normalizedBaseUrl = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    const finalUrl =
      path === "" ? normalizedBaseUrl : `${normalizedBaseUrl}${normalizedPath}`;

    Logger.debug(
      "Final URL:",
      finalUrl,
    );

    await this.page.goto(finalUrl);
  }
}
