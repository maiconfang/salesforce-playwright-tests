import { Page } from "@playwright/test";

import { SynchronizationComponent } from "@components/synchronization/SynchronizationComponent";
import { UiActionsComponent } from "@components/interactions/UiActionsComponent";

import { Logger } from "@framework-utils/logger/Logger";

/**
 * BasePage
 *
 * Responsibility:
 * - Centralize shared page infrastructure
 * - Provide reusable framework components
 * - Handle application navigation
 *
 * Benefits:
 * - Cleaner page objects
 * - Centralized framework behavior
 * - Better maintainability
 * - Enterprise-style architecture
 */
export class BasePage {

  protected readonly page: Page;

  protected readonly synchronizationComponent:
    SynchronizationComponent;

  protected readonly uiActionsComponent:
    UiActionsComponent;

  constructor(page: Page) {

    this.page = page;

    this.synchronizationComponent =
      new SynchronizationComponent(page);

    this.uiActionsComponent =
      new UiActionsComponent(page);
  }

  /**
   * Navigates to the application base URL.
   */
  async open(
    path: string = "",
  ): Promise<void> {

    Logger.debug(
      "Opening application",
    );

    const baseUrl =
      process.env.BASE_URL;

    if (!baseUrl) {
      throw new Error(
        "BASE_URL is not defined",
      );
    }

    const normalizedBaseUrl =
      baseUrl.endsWith("/")
        ? baseUrl.slice(0, -1)
        : baseUrl;

    const normalizedPath =
      path.startsWith("/")
        ? path
        : `/${path}`;

    const finalUrl =
      path === ""
        ? normalizedBaseUrl
        : `${normalizedBaseUrl}${normalizedPath}`;

    Logger.debug(
      `Navigating to URL: ${finalUrl}`,
    );

    await this.page.goto(finalUrl);

    Logger.debug(
      "Application opened successfully",
    );
  }
}