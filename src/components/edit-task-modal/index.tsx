import React, { FC, useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import ModalContext from '../../store/modal-context';
import { Task, TaskStatus } from '../../models/task';
import { shallowEqual } from '../../helpers/helpers';

interface EditTaskModalProps {
  handleEdit: (task: Task) => void;
  handleDelete: (taskId: number) => void;
  actualTask: Task;
}

export const EditTaskModal: FC<EditTaskModalProps> = ({ handleEdit, handleDelete, actualTask }) => {
  const { isOpenEditModal, toggleEditModal } = useContext(ModalContext);

  const [task, setTask] = useState<Task>(actualTask);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => {
      return { ...prev, title: e.target.value };
    });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => {
      return { ...prev, start: new Date(e.target.value) };
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => {
      return { ...prev, end: new Date(e.target.value) };
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as keyof typeof TaskStatus;

    if (Object.keys(TaskStatus).includes(inputValue)) {
      setTask(prev => {
        return { ...prev, status: TaskStatus[inputValue] };
      });
    }
  };

  const handleClose = () => {
    if (!shallowEqual(task, actualTask)) {
      setTask(actualTask);
    }

    toggleEditModal();
  };

  const handleSubmit = () => {
    handleEdit(task);
    toggleEditModal();
  };

  return (
    <Modal show={isOpenEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control type="text" placeholder="Enter task title" value={task.title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="taskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" value={task.status} onChange={handleStatusChange}>
              {Object.keys(TaskStatus).map((key: string) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={task.start === null ? '' : task.start.toISOString().split('T')[0]}
              onChange={handleStartDateChange} />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={task.end === null ? '' : task.end.toISOString().split('T')[0]}
              onChange={handleEndDateChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => handleDelete(actualTask.id)}>
          Delete
        </Button>
        <div className="ms-auto">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Edit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
