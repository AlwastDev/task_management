import React, { FC } from 'react';
import { Button, Table } from 'react-bootstrap';

import { Task } from '../../models/task';

import './task-list.module.scss';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  onChange: (task: Task) => void;
}

export const TaskList: FC<TaskListProps> = ({ tasks, onDelete, onChange }) => {
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Task Title</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {tasks.map(task => (
        <tr key={task.id}>
          <td>{task.title}</td>
          <td>{task.status}</td>
          <td>
            <Button variant="warning" onClick={() => onChange(task)}>
              Змінити
            </Button>
            <Button variant="danger" onClick={() => onDelete(task.id)}>
              Видалити
            </Button>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};
