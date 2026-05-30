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
  "should delete task via Salesforce API",

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
            `Task Delete Test ${timestamp}`,
          )

          .withStatus(
            "Not Started",
          )

          .withPriority(
            "Normal",
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

      const deleteResponse =
        await tasksClient.deleteTask(
          taskId,
        );

      expect(
        deleteResponse.status(),
      ).toBe(
        204,
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