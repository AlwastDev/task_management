export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  start: Date;
  end: Date;
}

export enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}