import React, { Component } from 'react';
import StartPage from '../start-page/start-page';
import GamePage from '../game-page/game-page';
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
        message: false,
        amountOfWords: null,
      }
    }

    startGame = () => {            
      if (!this.state.isStartPage) return; 
      if (this.state.level === '6') {
        this.gameModel.getUserWords()
          .then((res) => {
            console.log('here2', res.length)
            if (res.length < 20) {
              this.setState({
                amountOfWords: res.length, 
                message: true,
              })
              return;
            }
            this.setState({ isStartPage: false })
          })
      } else {
        this.setState({ 
          isStartPage: false, 
          message: false,
        })
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

    closeGame = () => {
      this.setState({isStartPage: true})
    }
   

    render() {
      const { isStartPage, isStatisticsPage, correctAnswers, incorrectAnswers, level, longestSeries, message, amountOfWords } = this.state;

      let page = <StartPage startGame={this.startGame} changeLevel={this.changeLevel} message={message} amountOfWords={amountOfWords}/>

      if (!isStartPage) {
        page = <GamePage showStatistics={this.showStatistics} level={level} closeGame={this.closeGame} />
      } 

      if (isStatisticsPage) {
        page = <StatisticsPage correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} showStartPage={this.showStartPage} longestSeries={longestSeries} level={level}/>
      }

      return (
        <> 
          {page} 
        </>
      );
    }
}
