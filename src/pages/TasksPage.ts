import {
  Page,
} from "@playwright/test";

import { BasePage } from "./BasePage";

import { GlobalSearchComponent } from "@components/search/GlobalSearchComponent";

import { ExecutionContextManager } from "@/core/execution/ExecutionContextManager";
import { ExecutionFlowType } from "@/core/execution/ExecutionFlowType";

import { Logger } from "@framework-utils/logger/Logger";

export class TasksPage extends BasePage {

  private readonly globalSearchComponent:
    GlobalSearchComponent;

  constructor(page: Page) {

    super(page);

    this.globalSearchComponent =
      new GlobalSearchComponent(page);
  }

  /**
   * Opens the Tasks module.
   */
  async openTasks(): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      "Opening Tasks page",
    );

    Logger.debug(
      "Opening Tasks page",
    );

    await this.page.goto(
      "/lightning/o/Task/list",
    );

    Logger.debug(
      "Tasks page opened successfully",
    );
  }

  /**
   * Searches for a Task.
   */
  async searchTask(
    taskSubject: string,
  ): Promise<void> {

    const executionContext =
      ExecutionContextManager.getContext();

    executionContext.addStep(
      ExecutionFlowType.FLOW,
      `Searching Task: ${taskSubject}`,
    );

    executionContext.addData(
      "Task Subject",
      taskSubject,
      "Task Search",
    );

    Logger.debug(
      `Searching Task: ${taskSubject}`,
    );

    await this.globalSearchComponent.search(
      taskSubject,
    );

    Logger.debug(
      `Task search executed successfully: ${taskSubject}`,
    );
  }
}