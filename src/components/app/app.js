import React from 'react';
import s from './app.module.css';
import Auth from '../Auth';

function onAuth(user) {
  console.log(user);
}

function App() {
  return (
    <>
      <h1 className={s.title}>Hello World</h1>
      <Auth onAuth={onAuth} />
    </>
  );
}
export default App;
