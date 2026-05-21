import { Page } from "@playwright/test";

import { SynchronizationComponent } from "@components/synchronization/SynchronizationComponent";
import { UiActionsComponent } from "@components/interactions/UiActionsComponent";

/**
 * BaseComponent
 *
 * Shared reusable behavior for UI components.
 *
 * Benefits:
 * - Centralized synchronization helpers
 * - Centralized UI interactions
 * - Reduced duplicated code
 * - Better maintainability
 * - More scalable architecture
 */
export class BaseComponent {

  protected readonly synchronizationComponent:
    SynchronizationComponent;

  protected readonly uiActionsComponent:
    UiActionsComponent;

  constructor(
    protected readonly page: Page,
  ) {

    this.synchronizationComponent =
      new SynchronizationComponent(page);

    this.uiActionsComponent =
      new UiActionsComponent(page);
  }
}