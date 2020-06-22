import React from 'react';
import s from './app.module.css';
import SpeakIt from '../speakit';

function App() {
  return (
    <>
      <h1 className={s.title}>Hello World</h1>
      <SpeakIt />
    </>
  );
}
export default App;
