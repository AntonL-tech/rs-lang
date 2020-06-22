import React, { Component } from 'react';
import s from './start-page.module.css';
// import Select from '../select/select'

export default class StartPage extends Component {
  render() {
    const { changePageState, changeLevel } = this.props;
   
    return <div className={s.page} >
      <div className={s.about}>        
        <h1 className={s.header}>Аудиовызов</h1>
        <p className={s.description}>
          Тренировка улучшает восприятие английской речи на слух.
        </p>
        <select className={s.select} onChange={changeLevel}>
          <option value="0">Уровень 1</option>
          <option value="1">Уровень 2</option>
          <option value="2">Уровень 3</option>
          <option value="3">Уровень 4</option>
          <option value="4">Уровень 5</option>
          <option value="5">Уровень 6</option>        
        </select>       
        <button className={s.start} onClick={changePageState}>Старт</button>        
      </div>
    </div>
  }
}