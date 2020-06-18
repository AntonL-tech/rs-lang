import React from 'react';
import s from './app.module.css';
import Auth from '../Auth';
import { BrowserRouter } from 'react-router-dom';

function onAuth(user) {
  console.log(user);
}

function App() {
  return (
    <>
      <BrowserRouter>
        <h1 className={s.title}>Hello World</h1>
        <Auth onAuth={onAuth} />
      </BrowserRouter>
    </>
  );
}
export default App;
