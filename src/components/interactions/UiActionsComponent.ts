import { Locator, Page } from "@playwright/test";
import { SynchronizationComponent } from "@components/synchronization/SynchronizationComponent";
import { Logger } from "@framework-utils/logger/Logger";

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

    Logger.debug(
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

    Logger.debug(
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

    Logger.debug(
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

    Logger.debug(
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

    Logger.debug(
      `Typing on locator: ${
        locatorName ?? "unknown"
      }`,
    );

    await locator.clear();

    await locator.type(value);
  }
}