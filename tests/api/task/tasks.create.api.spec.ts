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
  "should create task via Salesforce API",

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
            `Salesforce API Task ${timestamp}`,
          )

          .withStatus(
            "In Progress",
          )

          .withPriority(
            "High",
          )

          .withDescription(
            "Task created through Playwright API automation.",
          )

          .withActivityDate(
            "2026-06-05",
          )

          .withIsReminderSet(
            true,
          )

          .withReminderDateTime(
            "2026-06-04T14:00:00.000Z",
          )

          .withCallType(
            "Outbound",
          )

          .withCallDisposition(
            "Completed",
          )

          .withCallDurationInSeconds(
            300,
          )

          .build();

      const response =
        await tasksClient.createTask(
          task,
        );

      console.log(
        "Created Task:",
        JSON.stringify(
          response,
          null,
          2,
        ),
      );

      expect(
        response.id,
      ).toBeTruthy();

      expect(
        response.success,
      ).toBeTruthy();

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