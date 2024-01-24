import React, { FC, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ModalContext from '../../store/modal-context';
import { Task } from '../../models/task';

import './calendar-view.module.scss';

const localizer = momentLocalizer(moment);

interface CalendarProps {
  tasks: Task[];
}

export const CalendarView: FC<CalendarProps> = ({ tasks }) => {
  const { handleSelectTask, toggleEditModal } = useContext(ModalContext);

  return (
    <Calendar
      startAccessor="start"
      endAccessor="end"
      localizer={localizer}
      onSelectEvent={(e) => {
        handleSelectTask(e);
        toggleEditModal();
      }}
      events={tasks.map((task) => {
        return {
          ...task, start: new Date(task.start), end: new Date(task.end),
        };
      })}
    />
  );
};
