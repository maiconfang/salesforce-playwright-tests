import { TaskData }
  from "@models/tasks/TaskData";

export function createTaskData():
  TaskData {

  const uniqueId =
    Date.now();

  return {

    subject:
      `FollowUp-${uniqueId}`,

  };
}