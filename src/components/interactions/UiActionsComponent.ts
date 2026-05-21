import { Locator, Page } from "@playwright/test";

import { SynchronizationComponent } from "@components/synchronization/SynchronizationComponent";

/**
 * Centralizes reusable UI interactions.
 */
export class UiActionsComponent {

  private readonly synchronizationComponent:
    SynchronizationComponent;

  constructor(
    private readonly page: Page,
  ) {

    this.synchronizationComponent =
      new SynchronizationComponent(page);
  }

  /**
   * Clicks an element after synchronization.
   */
  async click(locator: Locator): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(locator);

    await locator.scrollIntoViewIfNeeded();

    await locator.click();
  }

  /**
   * Clears and fills an input.
   */
  async fill(
    locator: Locator,
    value: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(locator);

    await locator.clear();

    await locator.fill(value);
  }

  /**
   * Presses a keyboard key on a locator.
   */
  async press(
    locator: Locator,
    key: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(locator);

    await locator.press(key);
  }

  /**
   * Clears an input field.
   */
  async clear(locator: Locator): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(locator);

    await locator.clear();
  }

  /**
   * Types text using keyboard events.
   */
  async type(
    locator: Locator,
    value: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(locator);

    await locator.clear();

    await locator.type(value);
  }
}