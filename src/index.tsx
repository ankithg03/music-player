import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './core/config/reportWebVitals';
import { Pages } from './Pages';
import './core/tailwind/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>
);

reportWebVitals();
