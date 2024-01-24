import { Task } from '../models/task';

export const validationTask = (task: Task | Omit<Task, 'id'>) => {
  if (task.title.length === 0) {
    return false;
  }

  if (task.start > task.end) {
    return false;
  }

  return true;
};