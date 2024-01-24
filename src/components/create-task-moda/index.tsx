import React, { FC, useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import ModalContext from '../../store/modal-context';
import { Task, TaskStatus } from '../../models/task';

const defaultValue = {
  title: '',
  status: TaskStatus.Pending,
  start: new Date(),
  end: new Date(),
};

interface CreateTaskModalProps {
  handleCreate: (task: Omit<Task, "id">) => void;
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({ handleCreate }) => {
  const { isOpenCreateModal, toggleCreateModal } = useContext(ModalContext);

  const [task, setTask] = useState<Omit<Task, 'id'>>({ ...defaultValue });

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

  const handleClose = () => {
    setTask(defaultValue);
    toggleCreateModal();
  };

  const handleSubmit = () => {
    handleCreate(task);
    toggleCreateModal();
  };


  return (
    <Modal show={isOpenCreateModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control type="text" placeholder="Enter task title" value={task.title} onChange={handleTitleChange} />
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};