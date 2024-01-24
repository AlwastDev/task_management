import React from 'react';

import { TaskManager } from './components/task-manager';
import ModalProvider from './store/modal-provider';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';


function App() {
  return (
    <ModalProvider>
      <div className="App">
        <TaskManager />
      </div>
    </ModalProvider>
  );
}

export default App;
