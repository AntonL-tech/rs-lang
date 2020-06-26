import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/app/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sprint from '../src/components/sprint-game/Sprint';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
