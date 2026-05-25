import { Locator, Page } from "@playwright/test";
import { SynchronizationComponent } from "@components/synchronization/SynchronizationComponent";
import { Logger } from "@framework-utils/logger/Logger";
import { ExecutionFlowType }  from "@execution/ExecutionFlowType";
import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";

/**
 * Centralizes reusable UI interactions and execution telemetry events.
 *
 * This component acts as the operational interaction layer
 * of the framework, providing reusable and synchronized
 * UI actions such as:
 * - click
 * - fill
 * - type
 * - clear
 * - keyboard interactions
 *
 * Responsibilities:
 * - execute synchronized UI interactions
 * - standardize UI operation behavior
 * - generate execution telemetry events
 * - register operational success/failure states
 * - enrich execution observability data
 *
 * Execution Observability:
 * - emits ACTION events before interactions
 * - emits SUCCESS events after successful operations
 * - emits ERROR events when failures occur
 * - generates human-readable execution telemetry
 * - preserves raw technical errors for debugging
 *
 * This component integrates directly with the
 * execution observability system through
 * TestExecutionContext and ExecutionContextManager.
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

    const target =
      locatorName ?? "unknown element";

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.ACTION,
      `Clicking ${target}`,
    );

    try {

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

      executionContext.addStep(
        ExecutionFlowType.SUCCESS,
        `Successfully clicked ${target}`,
      );

    } catch (error) {

    const rawError =
      error instanceof Error
        ? error.message
        : String(error);

    const technicalError =
      rawError
        .replace(/\u001b\[[0-9;]*m/g, "")
        .replace(/\n/g, " ")
        .trim();

    const summary =
      `${target} was not visible after 30 seconds`;

    executionContext.addStep(
      ExecutionFlowType.ERROR,
      `Failed to click ${target}`,
      undefined,
      summary,
      technicalError,
    );

      throw error;
    }
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