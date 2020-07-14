import React, { Component } from 'react';
import s from './StartScreen.module.css';
import sUI from '../../ui-speakit.module.css';
import EnglishLevelTest from '../../../english-level-test/EnglishLevelTest';

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={s.startScreen}>
        <EnglishLevelTest />
        <p>SPEAKIT</p>
        <p>Click on the words to hear them sound.</p>
        <p>Click on the button and speak the words into the microphone</p>
        <select
          className={s.level}
          onChange={(e) => {
            this.props.changeHandler(e.target.value);
          }}
        >
          {this.props.hasUserWords ? (
            <option value={-1}>User Level</option>
          ) : (
            ''
          )}
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
          <option value={4}>Level 4</option>
          <option value={5}>Level 5</option>
          <option value={6}>Level 6</option>
        </select>
        <button className={sUI.button} onClick={this.props.clickHandler}>
          Start Game
        </button>
      </div>
    );
  }
}

export default StartScreen;
