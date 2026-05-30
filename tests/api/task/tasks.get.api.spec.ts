import {
  test,
  expect,
  request,
} from "@playwright/test";

import { TasksClient }
  from "@clients/tasks/TasksClient";

import { SalesforceAuthClient }
  from "@auth/SalesforceAuthClient";

import { TaskBuilder }
  from "@builders/TaskBuilder";

import { TestExecutionContext }
  from "@execution/TestExecutionContext";

import { ExecutionContextManager }
  from "@/core/execution/ExecutionContextManager";

test(
  "should retrieve task by id via Salesforce API",

  async ({}, testInfo) => {

    const executionContext =
      new TestExecutionContext(
        testInfo.outputDir,
      );

    ExecutionContextManager.setContext(
      executionContext,
    );

    let apiContext;

    try {

      apiContext =
        await request.newContext();

      const authClient =
        new SalesforceAuthClient();

      const tasksClient =
        new TasksClient(
          apiContext,
          authClient,
        );

      const timestamp =
        new Date()
          .toISOString()
          .replace(/[:.]/g, "-");

      const task =
        new TaskBuilder()

          .withSubject(
            `Task Get Test ${timestamp}`,
          )

          .withStatus(
            "In Progress",
          )

          .withPriority(
            "High",
          )

          .withDescription(
            "Task created for GET validation.",
          )

          .build();

      const createResponse =
        await tasksClient.createTask(
          task,
        );

      expect(
        createResponse.id,
      ).toBeTruthy();

      const taskId =
        createResponse.id;

      const getResponse =
        await tasksClient.getTaskById(
          taskId,
        );

      expect(
        getResponse.status(),
      ).toBe(200);

      const taskData =
        await getResponse.json();

      console.log(
        "Retrieved Task:",
        JSON.stringify(
          taskData,
          null,
          2,
        ),
      );

      expect(
        taskData.Id,
      ).toBe(
        taskId,
      );

      expect(
        taskData.Subject,
      ).toBe(
        task.Subject,
      );

      expect(
        taskData.Status,
      ).toBe(
        task.Status,
      );

      expect(
        taskData.Priority,
      ).toBe(
        task.Priority,
      );

      expect(
        taskData.Description,
      ).toBe(
        task.Description,
      );

    } catch (error) {

      executionContext.addError(
        error,
      );

      throw error;

    } finally {

      if (apiContext) {

        await apiContext.dispose();
      }

      executionContext.saveFlow();

      ExecutionContextManager.clear();
    }
  },
);