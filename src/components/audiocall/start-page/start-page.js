import React, { Component } from 'react';
import s from './start-page.module.css';
import EnglishLevelTest from '../../english-level-test/EnglishLevelTest';

export default class StartPage extends Component {
  render() {
    const { startGame, changeLevel, message, amountOfWords } = this.props;
   
    return (
      <>
        <EnglishLevelTest />        
        <div className={s.page} >
          <div className={s.about}>        
            <h1 className={s.header}>Audiocall</h1>
            <p className={s.description}>          
              Improves your listening skills in English.
            </p>
            <select className={s.select} onChange={changeLevel}>
              <option value="6">User words</option>
              <option value="0">Level 1</option>
              <option value="1">Level 2</option>
              <option value="2">Level 3</option>
              <option value="3">Level 4</option>
              <option value="4">Level 5</option>
              <option value="5">Level 6</option>        
            </select>       
            <button className={s.start} onClick={startGame}>Start</button>  
            <p className={message ? s.warningMessage : s.warningMessageHidden}>
              {`Sorry, you've learned only ${amountOfWords} words. User mode will become available when you learn at least 20 words`}
            </p>     
          </div>
        </div>
      </>
    ) 
  }
}