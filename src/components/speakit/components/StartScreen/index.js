import React from 'react';
import s from './StartScreen.module.css';

const StartScreen = (props) => {
  return (
    <div className={s.startScreen} onClick={props.onClick}>
      <p>SPEAKIT</p>
      <p>Click on the words to hear them sound.</p>
      <p>Click on the button and speak the words into the microphone</p>
      <p>(Click here to start)</p>
    </div>
  );
};

export default StartScreen;
