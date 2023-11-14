import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './core/config/reportWebVitals';
import { Pages } from './Pages';

/** Redux Code Starts */
import { Provider } from 'react-redux'
import store from './custom/Redux/Store';
import './core/tailwind/index.css';

/** Drag and Drop Package */
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}><Pages /></Provider>
    </DndProvider>
  </React.StrictMode>
);

reportWebVitals();
