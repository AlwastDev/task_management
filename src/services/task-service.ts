import axios from 'axios';

import { Task, TaskStatus } from '../models/task';
import { getRandomInt } from '../helpers/helpers';

export const fetchTasks = async () => {
  try {
    const response = await axios(`${process.env.REACT_APP_API_URL}/tasks`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error(error);
  }
};

export const createTask = async (task: Omit<Task, "id">) => {
  try {
    const createTask: Task = {
      id: getRandomInt(1, 10000000),
      title: task.title,
      status: TaskStatus.Pending,
      start: task.start,
      end: task.end,
    };

    await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, createTask);

    return createTask;
  } catch (error) {
    console.error(error);
  }
};

export const editTask = async (task: Task) => {
  try {
    const updatedTask = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
      ...task
    });

    return updatedTask.data;
  } catch (error) {
    console.error(error);
  }
};

