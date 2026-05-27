import { Page } from "@playwright/test";

import { SynchronizationComponent }
  from "@components/synchronization/SynchronizationComponent";

import { UiActionsComponent }
  from "@components/interactions/UiActionsComponent";

import { TestExecutionContext }
  from "@/core/execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

/**
 * BaseComponent
 *
 * Shared reusable behavior for UI components.
 */
export class BaseComponent {

  protected readonly synchronizationComponent:
    SynchronizationComponent;

  protected readonly uiActionsComponent:
    UiActionsComponent;

  protected readonly testExecutionContext:
    TestExecutionContext;

  constructor(
    protected readonly page: Page,
  ) {

    this.synchronizationComponent =
      new SynchronizationComponent(page);

    this.uiActionsComponent =
      new UiActionsComponent(page);

    this.testExecutionContext =
      ExecutionContextManager.getContext();
  }
}