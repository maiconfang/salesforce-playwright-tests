export interface Task {
  Subject?: string;
  Status?: string;
  Priority?: string;
  Description?: string;
  ActivityDate?: string;

  IsReminderSet?: boolean;
  ReminderDateTime?: string;

  CallType?: string;
  CallDisposition?: string;
  CallDurationInSeconds?: number;
}