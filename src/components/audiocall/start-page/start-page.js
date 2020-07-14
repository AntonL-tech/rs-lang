import React, { Component } from 'react';
import s from './start-page.module.css';
import Select from '../select/select'

export default class StartPage extends Component {
  render() {
    const { startGame, changeLevel } = this.props;
   
    return <div className={s.page} >
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
      </div>
    </div>
  }
}