import { Task } from "@api/models/Task";

export class TaskBuilder {

  private task: Task = {
    Subject: "Salesforce API Task Automation",
    Status: "Not Started",
    Priority: "Normal",
  };

  withSubject(
    subject: string,
  ): TaskBuilder {

    this.task.Subject = subject;

    return this;
  }

  withStatus(
    status: string,
  ): TaskBuilder {

    this.task.Status = status;

    return this;
  }

  withPriority(
    priority: string,
  ): TaskBuilder {

    this.task.Priority = priority;

    return this;
  }

  withDescription(
    description: string,
  ): TaskBuilder {

    this.task.Description = description;

    return this;
  }

  withActivityDate(
    activityDate: string,
  ): TaskBuilder {

    this.task.ActivityDate = activityDate;

    return this;
  }

  withIsReminderSet(
    isReminderSet: boolean,
  ): TaskBuilder {

    this.task.IsReminderSet = isReminderSet;

    return this;
  }

  withReminderDateTime(
    reminderDateTime: string,
  ): TaskBuilder {

    this.task.ReminderDateTime =
      reminderDateTime;

    return this;
  }

  withCallType(
    callType: string,
  ): TaskBuilder {

    this.task.CallType = callType;

    return this;
  }

  withCallDisposition(
    callDisposition: string,
  ): TaskBuilder {

    this.task.CallDisposition =
      callDisposition;

    return this;
  }

  withCallDurationInSeconds(
    callDurationInSeconds: number,
  ): TaskBuilder {

    this.task.CallDurationInSeconds =
      callDurationInSeconds;

    return this;
  }

  build(): Task {

    return this.task;
  }
}