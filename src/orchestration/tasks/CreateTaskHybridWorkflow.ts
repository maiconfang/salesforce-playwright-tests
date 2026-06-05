import {
  APIRequestContext,
  Page,
  request,
} from "@playwright/test";

import { TasksClient }
  from "@clients/tasks/TasksClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { TasksPage }
  from "@pages/TasksPage";


import {
  WorkflowResult,
} from "@models/common/WorkflowResult";
import { createTaskData } from "@test-data/tasks";

export class CreateTaskHybridWorkflow {

  private apiContext!:
    APIRequestContext;

  private authClient!:
    SalesforceAuthClient;

  private tasksClient!:
    TasksClient;

  private tasksPage!:
    TasksPage;

  constructor(
    private readonly page: Page,
  ) {}

  async execute():
    Promise<WorkflowResult> {

    await this.initialize();

    const taskData =
      createTaskData();

    const response =
      await this.tasksClient.createTask({

        Subject:
          taskData.subject,

      });

    console.log(
      "Hybrid Workflow - Created Task:",
      JSON.stringify(
        response,
        null,
        2,
      ),
    );

    await this.tasksPage.open();

    await this.tasksPage.openTasks();

    await this.tasksPage.searchTask(
      taskData.subject,
    );

    return {

      id:
        response.id,

      success:
        response.success,

      entityType:
        "Task",

      entityName:
        taskData.subject,

    };
  }

  private async initialize() {

    this.apiContext =
      await request.newContext({

        baseURL:
          process.env.SF_INSTANCE_URL,

      });

    this.authClient =
      new SalesforceAuthClient();

    this.tasksClient =
      new TasksClient(
        this.apiContext,
        this.authClient,
      );

    this.tasksPage =
      new TasksPage(
        this.page,
      );
  }
}