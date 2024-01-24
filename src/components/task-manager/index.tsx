import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { Task } from '../../models/task';
import { createTask, deleteTask, editTask, fetchTasks } from '../../services/task-service';
import ModalContext from '../../store/modal-context';
import { CalendarView } from '../calendar-view';
import { EditTaskModal } from '../edit-task-modal';
import { CreateTaskModal } from '../create-task-moda';

import styles from './task-manager.module.scss';

export const TaskManager = () => {
  const { selectedTask, toggleCreateModal } = useContext(ModalContext);

  const [tasks, setTasks] = useState<Task[]>([]);

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId).then(() => {
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);
    });
  };

  const handleEditTask = async (task: Task) => {
    if (selectedTask) {
      await editTask(task).then((updatedTask) => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }

          return task;
        });

        setTasks(updatedTasks);
      });
    }
  };

  const handleCreateTask = async (task: Omit<Task, 'id'>) => {
    await createTask(task).then((createdTask) => {
      setTasks(prev => [...prev, createdTask!]);
    });
  };

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h1>Управління завданнями</h1>
        <Button variant="success" onClick={toggleCreateModal}>Створити завдання</Button>
      </header>
      <main>
        <CalendarView tasks={tasks} />
      </main>
      <CreateTaskModal handleCreate={handleCreateTask} />
      {selectedTask &&
        <EditTaskModal handleDelete={handleDeleteTask} handleEdit={handleEditTask} actualTask={selectedTask} />}
    </div>
  );
};
