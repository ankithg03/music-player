import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './core/config/reportWebVitals';
import { Pages } from './Pages';

/** Redux Code Starts */
import { Provider } from 'react-redux'
import store from './custom/Redux/Store';
import './core/tailwind/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}><Pages /></Provider>
  </React.StrictMode>
);

reportWebVitals();
