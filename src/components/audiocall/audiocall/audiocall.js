import React, { Component } from 'react';
import StartPage from '../start-page/start-page';
import GamePage from '../game-page/game-page';
import s from './audiocall.module.css';
import StatisticsPage from '../statistic-page/statistics-page';

export default class Audiocall extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isStartPage: true,
        isStatisticsPage: false,
        level: 0,
      }
    }

    startGame = () => {     
      if (!this.state.isStartPage) return;
      this.setState({ isStartPage: false })
    } 
    
    showStatistics = (correctAnswers, incorrectAnswers) => {
      this.setState({
        isStatisticsPage: true, 
        correctAnswers,
        incorrectAnswers,
      })
    }
  
    changeLevel = (event) => {
      this.setState({ level: event.target.value });  
    }
    
    render() {
      const { isStartPage, isStatisticsPage, correctAnswers, incorrectAnswers, level } = this.state;

      let page = <StartPage startGame={this.startGame} changeLevel={this.changeLevel} />

      if (!isStartPage) {
        page = <GamePage showStatistics={this.showStatistics} level={level}/>
      } 

      if (isStatisticsPage) {
        page = <StatisticsPage correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} level= {level}/>
      }

      return (
      <>
        <button className={s.cancel}/>
        {page}
      </>
      )      
    }
}
