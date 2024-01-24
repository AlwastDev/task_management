import React, { useState } from 'react';

import ModalContext from './modal-context';
import { Task } from '../models/task';

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const toggleCreateModal = () => {
    setIsOpenCreateModal((prevState) => !prevState);
  };

  const toggleEditModal = () => {
    setIsOpenEditModal((prevState) => !prevState);
  };

  const contextValue = {
    selectedTask,
    isOpenCreateModal,
    isOpenEditModal,
    handleSelectTask,
    toggleCreateModal,
    toggleEditModal
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
