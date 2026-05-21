import { Locator, Page } from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

/**
 * Encapsulates reusable textbox interactions.
 */
export class TextboxComponent extends BaseComponent {


  constructor(page: Page) {
    super(page);


  }

  /**
   * Fills a textbox field.
   */
  async fill(
    locator: Locator,
    value: string,
  ): Promise<void> {

    await this.uiActionsComponent.fill(
      locator,
      value,
    );
  }

  /**
   * Types text using keyboard events.
   */
  async type(
    locator: Locator,
    value: string,
  ): Promise<void> {

    await this.uiActionsComponent.type(
      locator,
      value,
    );
  }

  /**
   * Clears a textbox field.
   */
  async clear(locator: Locator): Promise<void> {
    await this.uiActionsComponent.clear(locator);
  }
}