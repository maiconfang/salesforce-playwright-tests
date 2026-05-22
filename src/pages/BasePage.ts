import { Page } from "@playwright/test";

import { SynchronizationComponent } from "@components/synchronization/SynchronizationComponent";
import { UiActionsComponent } from "@components/interactions/UiActionsComponent";

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

     console.log("BASE_URL Test Maicon Fang:", process.env.BASE_URL);

    await this.page.goto(`${baseUrl}${path}`);
  }
}
