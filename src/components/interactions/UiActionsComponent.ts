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
  async click(
    locator: Locator,
    locatorName?: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(
        locator,
        locatorName,
      );

    await locator.scrollIntoViewIfNeeded();

    console.log(
      `Clicking locator: ${
        locatorName ?? "unknown"
      }`,
    );

    await locator.click();
  }

  /**
   * Clears and fills an input.
   */
  async fill(
    locator: Locator,
    value: string,
    locatorName?: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(
        locator,
        locatorName,
      );

    console.log(
      `Filling locator: ${
        locatorName ?? "unknown"
      }`,
    );

    await locator.clear();

    await locator.fill(value);
  }

  /**
   * Presses a keyboard key on a locator.
   */
  async press(
    locator: Locator,
    key: string,
    locatorName?: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(
        locator,
        locatorName,
      );

    console.log(
      `Pressing key on locator: ${
        locatorName ?? "unknown"
      }`,
    );

    await locator.press(key);
  }

  /**
   * Clears an input field.
   */
  async clear(
    locator: Locator,
    locatorName?: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(
        locator,
        locatorName,
      );

    console.log(
      `Clearing locator: ${
        locatorName ?? "unknown"
      }`,
    );

    await locator.clear();
  }

  /**
   * Types text using keyboard events.
   */
  async type(
    locator: Locator,
    value: string,
    locatorName?: string,
  ): Promise<void> {

    await this.synchronizationComponent
      .waitUntilClickable(
        locator,
        locatorName,
      );

    console.log(
      `Typing on locator: ${
        locatorName ?? "unknown"
      }`,
    );

    await locator.clear();

    await locator.type(value);
  }
}