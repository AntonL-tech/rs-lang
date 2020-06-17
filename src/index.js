import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sprint from '../src/components/sprint-game/Sprint';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Sprint />
  </React.StrictMode>,
  document.getElementById('root')
);


