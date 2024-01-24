import { createContext } from 'react';
import { Task } from '../models/task';

interface ModalContextProps {
  selectedTask: Task | null;
  isOpenCreateModal: boolean;
  isOpenEditModal: boolean;
  handleSelectTask: (task: Task) => void;
  toggleCreateModal: () => void;
  toggleEditModal: () => void;
}

const defaultValues: ModalContextProps = {
  selectedTask: null,
  isOpenCreateModal: false,
  isOpenEditModal: false,
  handleSelectTask: () => {},
  toggleCreateModal: () => {},
  toggleEditModal: () => {},
}

const ModalContext = createContext<ModalContextProps>(defaultValues);

export default ModalContext;