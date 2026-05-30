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
  "should update task via Salesforce API",

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
            `Task Update Test ${timestamp}`,
          )

          .withStatus(
            "Not Started",
          )

          .withPriority(
            "Normal",
          )

          .withDescription(
            "Original task description.",
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

      const updatedTask =
        new TaskBuilder()

          .withSubject(
            `Updated Task ${timestamp}`,
          )

          .withStatus(
            "Completed",
          )

          .withPriority(
            "High",
          )

          .withDescription(
            "Task updated through Playwright API automation.",
          )

          .build();

      const updateResponse =
        await tasksClient.updateTask(
          taskId,
          updatedTask,
        );

      expect(
        updateResponse.status(),
      ).toBe(204);

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
        "Updated Task:",
        JSON.stringify(
          taskData,
          null,
          2,
        ),
      );

      expect(
        taskData.Subject,
      ).toBe(
        updatedTask.Subject,
      );

      expect(
        taskData.Status,
      ).toBe(
        updatedTask.Status,
      );

      expect(
        taskData.Priority,
      ).toBe(
        updatedTask.Priority,
      );

      expect(
        taskData.Description,
      ).toBe(
        updatedTask.Description,
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