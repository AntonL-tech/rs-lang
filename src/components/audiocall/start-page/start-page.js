import React, { Component } from 'react';
import s from './start-page.module.css';
import Description from '../description/description';
import Button from '../button/button';
import Select from '../select/select'

export default class StartPage extends Component {
  render() {
    const { changePageState, closeGame, changeLevel } = this.props;
    // console.log(callback)
    return <div className={s.page} >
      <div className={s.about}>        
        <Description />
        <select className={s.select} onChange={changeLevel}>
          <option value="0">Уровень 1</option>
          <option value="1">Уровень 2</option>
          <option value="2">Уровень 3</option>
          <option value="3">Уровень 4</option>
          <option value="4">Уровень 5</option>
          <option value="5">Уровень 6</option>        
        </select>
        {/* <Select callback={changeLevel} level = {this.props.level}/> */}
        <Button callback = {changePageState} additionalClassName = 'start' name = 'Start'/>
        <Button callback = {closeGame} additionalClassName = 'cancel' name = ''/>
      </div>
    </div>
  }
}