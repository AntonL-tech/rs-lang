import React, { Component } from 'react';
import StartPage from '../start-page/start-page';
import GamePage from '../game-page/game-page';
import s from './audiocall.module.css';
import StatisticsPage from '../statistic-page/statistics-page';
import GameModel from '../game-model/game-model'; 

export default class Audiocall extends Component {
    constructor(props) {
      super(props);
      this.gameModel = new GameModel();
      this.state = {
        isStartPage: true,
        isStatisticsPage: false,
        level: '6',
      }
    }

    startGame = () => {            
      if (!this.state.isStartPage) return;  
      console.log('here') 
      if (!this.state.level === 6) {
        this.gameModel.getUserWords()
          .then((res) => {
            console.log('here2')
            if (res.length < 5) return;
            this.setState({ isStartPage: false })
          })
      } else {
        this.setState({ isStartPage: false })
      }
    } 
    
    showStatistics = (correctAnswers, incorrectAnswers, longestSeries) => {
      this.setState({
        isStatisticsPage: true, 
        correctAnswers,
        incorrectAnswers,
        longestSeries,
      })
    }
  
    showStartPage = () => {
      this.setState({
        isStatisticsPage: false, 
        isStartPage: true,
      })
    }

    changeLevel = (event) => {
      this.setState({ level: event.target.value });  
    }
   

    render() {
      const { isStartPage, isStatisticsPage, correctAnswers, incorrectAnswers, level, longestSeries } = this.state;

      let page = <StartPage startGame={this.startGame} changeLevel={this.changeLevel} />

      if (!isStartPage) {
        page = <GamePage showStatistics={this.showStatistics} level={level}/>
      } 

      if (isStatisticsPage) {
        page = <StatisticsPage correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} showStartPage={this.showStartPage} longestSeries={longestSeries} level={level}/>
      }

       
    console.log(level);

      return (
      <>
        <button className={s.cancel}/>
        {page}
      </>
      )      
    }
}
