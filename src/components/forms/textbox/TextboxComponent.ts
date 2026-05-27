import { Locator, Page } from "@playwright/test";

import { BaseComponent } from "@components/BaseComponent";

/**
 * TextboxComponent
 *
 * Responsibility:
 * - Handle reusable textbox interactions
 * - Fill textbox fields
 * - Type text using keyboard events
 * - Clear textbox fields
 *
 * Benefits:
 * - Reusable textbox behavior
 * - Cleaner form components
 * - Better maintainability
 * - Enterprise-style architecture
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
    elementName = "Textbox input",
  ): Promise<void> {

    await this.uiActionsComponent.fill(
      locator,
      value,
      elementName,
    );

    this.testExecutionContext.addData(
      elementName,
      value,
    );
  }

  /**
   * Types text using keyboard events.
   */
  async type(
    locator: Locator,
    value: string,
    elementName = "Textbox input",
  ): Promise<void> {

    await this.uiActionsComponent.type(
      locator,
      value,
      elementName,
    );

  }

  /**
   * Clears a textbox field.
   */
  async clear(
    locator: Locator,
    elementName = "Textbox input",
  ): Promise<void> {

    await this.uiActionsComponent.clear(
      locator,
      elementName,
    );
  }
}